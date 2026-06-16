


import express from "express"
import { Auth } from "../controllers/BusinessAuthControllers.js"

const routes=express.Router();

routes.post("/",Auth);

export default routes;