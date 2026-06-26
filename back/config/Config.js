import dotenv from "dotenv";

dotenv.config();

// All environment-driven config flows through this single module so it's
// obvious in one place what the server needs to run.
const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;
const JWT_KEY = process.env.JWT_KEY;
// Stripe is optional at boot — only required when a checkout session is created.
// See PaymentController.js — Stripe is constructed lazily there.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
// Where uploaded images land on disk. Use an absolute path in production
// (e.g. /var/data/turf-booking/uploads) so files survive cwd changes.
const UPLOAD_DIR = process.env.UPLOAD_DIR || "assets";
// Public origin of the frontend — used by Stripe to build success/cancel
// redirect URLs after checkout.
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5174";

export { PORT, DB_URL, JWT_KEY, STRIPE_SECRET_KEY, UPLOAD_DIR, FRONTEND_URL };
