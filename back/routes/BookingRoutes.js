import express from 'express';
import { GetAllBooking, SaveBooking,DeleteAllBooking,GetAllBookingByTurfId, GetMyAllBookings } from '../controllers/BookingController.js';
import IsLoggedIn from '../helpers/IsLoggedIn.js';

const routes = express.Router();

routes.post("/",IsLoggedIn,SaveBooking);
routes.get("/mybooking", IsLoggedIn, GetMyAllBookings);
routes.get("/getbyturfid/:id",GetAllBookingByTurfId)
routes.get("/getbyturfid/:id/:date",GetAllBooking)
routes.get("/deletesaribooking",DeleteAllBooking)

export default routes;