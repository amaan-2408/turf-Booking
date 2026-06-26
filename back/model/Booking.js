import mongoose from "../db/Connect.js"

const BookingSchema=mongoose.Schema({
    turf_id : {type:mongoose.Schema.Types.ObjectId,ref:"turf"},
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
      date : String,
      slot : [],
      amount : Number,
      advance_amount : Number,
      remaining_amount : Number,
      // Set when booking comes through Stripe (full payment via checkout).
      // Lets us correlate Booking rows with Stripe sessions for refunds /
      // reconciliation, and powers idempotency checks in the webhook +
      // finalize fallback (so we don't double-book if both fire).
      stripe_session_id : { type: String, default: null },
},{timestamps:true})

const Booking=mongoose.model("booking",BookingSchema);

export default Booking