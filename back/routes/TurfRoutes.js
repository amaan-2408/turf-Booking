import express from "express"
import IsLoggedIn from "../helpers/IsLoggedIn.js";
import {DeleteAllTurf, GetAllTurf, GetTurfById, SaveAllTurf,GetAllTurfByBusiness} from "../controllers/TurfControllers.js"

const routes=express.Router();

routes.get("/",GetAllTurf)
routes.get("/allturf",IsLoggedIn,GetAllTurfByBusiness)
routes.get("/:id",GetTurfById)
routes.post("/",IsLoggedIn,SaveAllTurf)
routes.get("/deletesaareturf",DeleteAllTurf)

export default routes