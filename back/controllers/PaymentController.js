import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/Config.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

const CreateCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

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

      success_url:
        "http://localhost:5174/payment-success",

      cancel_url:
        "http://localhost:5174/payment-cancel",
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