import mongoose from "../db/Connect.js"

const BookingSchema=mongoose.Schema({
    turf_id : {type:mongoose.Schema.Types.ObjectId,ref:"turf"},
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
      date : String,
      slot : [],
      amount : Number,
      advance_amount : Number,
      remaining_amount : Number,
},{timestamps:true})

const Booking=mongoose.model("booking",BookingSchema);

export default Booking