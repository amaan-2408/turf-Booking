import express from "express";
import IsLoggedIn from "../helpers/IsLoggedIn.js";
import {
  CreateCheckoutSession,
  FinalizeBookingFromSession,
} from "../controllers/PaymentController.js";

const routes = express.Router();

// IMPORTANT: /webhook is mounted separately in App.js with `express.raw()`
// BEFORE express.json(), because Stripe signature verification needs the
// raw request body. Don't add it here — adding it here would let
// express.json() eat the body first.

routes.post("/create-checkout-session", IsLoggedIn, CreateCheckoutSession);
routes.post("/finalize-booking", IsLoggedIn, FinalizeBookingFromSession);

export default routes;