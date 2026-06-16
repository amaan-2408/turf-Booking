import express from "express";
import { DeleteAllBusiness, SaveBusiness,BusinessMyProfile ,GetAllBookingByBusinessId,BusinessUpdateProfile} from "../controllers/BusinessController.js";
import IsLoggedIn from '../helpers/IsLoggedIn.js';

const routes=express.Router();

routes.post("/",SaveBusiness);

routes.get("/deletesaarebusiness",DeleteAllBusiness)
routes.get("/myprofile",IsLoggedIn, BusinessMyProfile)
routes.put("/updateprofile",IsLoggedIn, BusinessUpdateProfile)
routes.get("/mybooking/:id",GetAllBookingByBusinessId)
export default routes;