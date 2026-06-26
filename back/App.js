import express from "express";
import { PORT, UPLOAD_DIR } from "./config/Config.js";
import cors from "cors";
import AllRoutes from "./routes/AllRoutes.js";
import path from "path";
import Upload from "express-fileupload";

const app = express();

// IMPORTANT: Stripe webhook must receive the RAW request body for signature
// verification. Mount express.raw() for /webhook BEFORE any body parsers
// that would consume the stream (express.json, express.urlencoded, etc.).
app.use("/api/v1/payment/webhook", express.raw({ type: "application/json" }));

// Static assets (uploaded turf images, etc.) served from the configured
// upload dir. Sub-paths (e.g. /turf_images/foo.jpg) are preserved so the
// frontend's `${IMAGE_BASE_URL}/turf_images/${name}` URLs work.
app.use(express.static(path.resolve(UPLOAD_DIR)));

// Use temp files so large uploads don't OOM the Node process. The controller
// (TurfControllers.js) calls `image.mv(filepath)` to move it to permanent
// storage under UPLOAD_DIR/turf_images/.
app.use(
  Upload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB cap on turf images
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(AllRoutes);

// Stripe webhook handler — must be a direct route (not behind AllRoutes)
// because AllRoutes goes through express.json() which destroys the raw body.
import { StripeWebhook } from "./controllers/PaymentController.js";
app.post("/api/v1/payment/webhook", StripeWebhook);

app.listen(PORT, () => {
  console.log("running on PORT", PORT);
});