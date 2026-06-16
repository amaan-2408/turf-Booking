import mongoose from "mongoose"
import { DB_URL } from "../config/Config.js"

mongoose
.connect(DB_URL)
.then(()=>{
console.log("Database connected",)
})
.catch((err)=>{
    console.log("error in connnecting with Database",err)
})
export default mongoose