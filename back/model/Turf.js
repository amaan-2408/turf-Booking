
import mongoose from "../db/Connect.js";
import Business from "../model/Business.js";

const TurfSchema=mongoose.Schema({
name:String,
price:Number,
address:String,
contact:String,
image:String,
detail:String,
lat:Number,
long:Number,
time_open:{ type:String,default:""},
time_close:{ type:String,default:""},
businessId:{type:mongoose.Schema.Types.ObjectId,ref:"Business"}
        //means agr ab apn time nhi bhi de toh bhi code chlega
},{timestamps:true , collection:"turf"});

const Turf=mongoose.model("turf",TurfSchema)
export default Turf

