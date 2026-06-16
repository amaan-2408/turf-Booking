import express from "express"
import { PORT } from "./config/Config.js";
import cors from "cors";
import AllRoutes from "./routes/AllRoutes.js";
import path from "path"
import Upload from "express-fileupload";
let app=express();

app.use(express.static(path.resolve()+"/assets"))
// public folder ko acess krne ke liye
app.use(Upload());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(AllRoutes)

app.listen(PORT,()=>{
    console.log("running on PORT",PORT)
})

