import express from "express";
import { CreateCheckoutSession } from "../controllers/PaymentController.js";

const routes = express.Router();

routes.post("/create-checkout-session", CreateCheckoutSession);

export default routes;