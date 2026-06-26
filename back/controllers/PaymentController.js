import Stripe from "stripe";
import Booking from "../model/Booking.js";
import {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL,
} from "../config/Config.js";

// Lazy Stripe singleton — only construct when a checkout is actually requested.
// This lets the server boot and serve non-payment routes even if the Stripe
// key isn't configured (useful in dev / when payments are out of scope).
let _stripe = null;
const getStripe = () => {
  if (!_stripe) {
    if (!STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not configured. Add it to back/.env to enable payments."
      );
    }
    _stripe = new Stripe(STRIPE_SECRET_KEY);
  }
  return _stripe;
};

// Normalize a date input (ISO string, Date object, or "YYYY-MM-DD") to
// "YYYY-MM-DD" so the Booking row matches what BookingController.SaveBooking
// stores. Keeps the two flows (full Stripe vs 25% advance) consistent.
const normalizeDate = (d) => {
  if (!d) return null;
  if (typeof d === "string") return d.split("T")[0];
  if (d instanceof Date) return d.toISOString().split("T")[0];
  return String(d);
};

const CreateCheckoutSession = async (req, res) => {
  try {
    const { amount, turf_id, date, slot } = req.body;

    // Light validation — the webhook will reject missing fields, but failing
    // early gives a clearer error to the user.
    if (!turf_id || !date || !slot || !Array.isArray(slot) || slot.length === 0) {
      return res.status(400).send({
        success: false,
        message:
          "Missing booking info. turf_id, date, and slot (non-empty array) are required.",
      });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).send({
        success: false,
        message: "amount must be a positive number",
      });
    }

    const stripe = getStripe();
    const userId = req.obj?._id; // set by IsLoggedIn if route is protected

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Turf Booking",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      // Stripe will redirect the user to these URLs after checkout. Build
      // them from FRONTEND_URL so deploys don't need a code change.
      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/payment-cancel`,

      // Carry the booking info through Stripe. `metadata` is the only place
      // we can stash this since the user is leaving our site. Webhook reads
      // it back to create the Booking row on checkout.session.completed.
      metadata: {
        turf_id: String(turf_id),
        date: normalizeDate(date),
        slot: JSON.stringify(slot),
        user_id: userId ? String(userId) : "",
        amount: String(amount),
      },
    });

    res.send({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

// Stripe webhook — called by Stripe (not the browser) when a checkout
// completes. We verify the signature with STRIPE_WEBHOOK_SECRET, then
// create the Booking row from the metadata we stuffed into the session.
//
// IMPORTANT: this route must be mounted BEFORE express.json() in App.js,
// otherwise the raw body needed for signature verification is gone.
const StripeWebhook = async (req, res) => {
  // If Stripe isn't even configured, no point trying to verify anything.
  // Return 503 so Stripe knows it's a config issue, not a bad signature.
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    console.log(
      "Webhook received but Stripe is not fully configured (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET missing). Skipping."
    );
    return res.status(503).send("Stripe is not configured on this server.");
  }

  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body (Buffer) — preserved by express.raw
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata || {};

    try {
      // Idempotency — if our finalize-booking fallback already created the
      // row from the success page, don't double-book.
      const existing = await Booking.findOne({
        user_id: meta.user_id,
        turf_id: meta.turf_id,
        date: meta.date,
      });
      if (existing) {
        return res.send({ received: true, deduped: true });
      }

      await Booking.create({
        turf_id: meta.turf_id,
        user_id: meta.user_id,
        date: meta.date,
        slot: meta.slot ? JSON.parse(meta.slot) : [],
        amount: Number(meta.amount) || 0,
        advance_amount: Number(meta.amount) || 0, // full payment → 0 remaining
        remaining_amount: 0,
        stripe_session_id: session.id,
      });
    } catch (err) {
      console.log("Failed to create booking from webhook:", err.message);
      // 200 so Stripe doesn't retry forever; we logged it.
    }
  }

  res.send({ received: true });
};

// Fallback for local dev / when the webhook can't reach us (e.g. localhost
// without a tunnel). The frontend PaymentSuccess page calls this with the
// session_id from the URL, we look it up on Stripe, and create the booking
// from the session metadata.
const FinalizeBookingFromSession = async (req, res) => {
  try {
    const { session_id } = req.body;
    if (!session_id) {
      return res
        .status(400)
        .send({ success: false, message: "session_id is required" });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(402).send({
        success: false,
        message: `Payment not complete (status: ${session.payment_status})`,
      });
    }

    const meta = session.metadata || {};

    // Idempotency — webhook may have already created it.
    const existing = await Booking.findOne({
      user_id: meta.user_id,
      turf_id: meta.turf_id,
      date: meta.date,
    });
    if (existing) {
      return res.send({ success: true, deduped: true, booking: existing });
    }

    const booking = await Booking.create({
      turf_id: meta.turf_id,
      user_id: meta.user_id,
      date: meta.date,
      slot: meta.slot ? JSON.parse(meta.slot) : [],
      amount: Number(meta.amount) || 0,
      advance_amount: Number(meta.amount) || 0,
      remaining_amount: 0,
      stripe_session_id: session.id,
    });

    res.send({ success: true, booking });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export { CreateCheckoutSession, StripeWebhook, FinalizeBookingFromSession };