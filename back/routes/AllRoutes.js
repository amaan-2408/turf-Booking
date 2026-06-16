import express from "express"
import TurfRoutes from "./TurfRoutes.js";
import UserRoutes from "./UserRoutes.js";
import BusinessRoutes from "./BusinessRoutes.js";
import UserAuthRoutes from "./UserAuthRoutes.js";
import BusinessAuthRoutes from "./BusinessAuthRoutes.js"
import BookingRoutes from "./BookingRoutes.js"

const routes=express.Router();

routes.use("/api/v1/turfs",TurfRoutes)

routes.use("/api/v1/user",UserRoutes)
routes.use("/api/v1/user/auth",UserAuthRoutes)
routes.use("/api/v1/booking",BookingRoutes)

routes.use("/api/v1/business",BusinessRoutes)
routes.use("/api/v1/business/auth",BusinessAuthRoutes)
export default routes