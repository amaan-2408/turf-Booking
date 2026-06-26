import Stripe from "stripe";
import { STRIPE_SECRET_KEY, FRONTEND_URL } from "../config/Config.js";

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

const CreateCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;
    const stripe = getStripe();

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
      success_url: `${FRONTEND_URL}/payment-success`,

      cancel_url: `${FRONTEND_URL}/payment-cancel`,
    });

    res.send({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export { CreateCheckoutSession };
