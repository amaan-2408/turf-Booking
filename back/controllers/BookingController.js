import Booking from "../model/Booking.js";

let SaveBooking = async (req, res) => {
    let d=req.body.date;
    let newD=d.split("T")[0];
    req.body.date=newD;
    req.body.user_id = req.obj._id;
    await Booking.create(req.body);
    res.send({ success: true });
}

let GetAllBooking=async(req,res)=>{
    let id = req.params.id;
    let date=req.params.date;
    let result = await Booking.find({turf_id : id,date : date}).populate("turf_id");
    res.send(result);
}

let GetAllBookingByTurfId=async(req,res)=>{
  let turfid=req.params.id;
  let result=await Booking.find({turf_id:turfid}).populate("turf_id").populate("user_id").exec()
  res.send(result)
}

let DeleteAllBooking=async(req,res)=>{
   await Booking.deleteMany();
   res.send("deleted")
 }
 
export { SaveBooking,GetAllBooking,DeleteAllBooking,GetAllBookingByTurfId}