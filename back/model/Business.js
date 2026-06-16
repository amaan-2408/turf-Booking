import mongoose from "../db/Connect.js"

const BusinessSchema=mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    password:String,
},{timestamps:true})

const Business=mongoose.model("Business",BusinessSchema);

export default  Business