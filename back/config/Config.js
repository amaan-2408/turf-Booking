import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const JWT_KEY = process.env.JWT_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export { PORT, DB_URL, JWT_KEY, STRIPE_SECRET_KEY };
