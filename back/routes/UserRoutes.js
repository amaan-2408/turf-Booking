import express from "express"
import {DeleteAllUser,GetBookingByUserId, SaveUser,MyProfile,UpdateProfile} from "../controllers/UserControllers.js"
import IsLoggedIn from '../helpers/IsLoggedIn.js';

const routes=express.Router();


routes.post("/",SaveUser)
routes.get("/mybooking",IsLoggedIn, GetBookingByUserId)
routes.get("/myprofile",IsLoggedIn, MyProfile)
routes.put("/updateprofile",IsLoggedIn, UpdateProfile)
routes.get("/deletesaareuser",DeleteAllUser)

export default routes