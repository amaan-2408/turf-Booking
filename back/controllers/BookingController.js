import Booking from "../model/Booking.js";

let SaveBooking = async (req, res) => {
  let d = req.body.date;
  let newD = d.split("T")[0];

  req.body.date = newD;
  req.body.user_id = req.obj._id;

  if (!req.body.slot || req.body.slot.length === 0) {
    return res.status(400).send({
      success: false,
      message: "Please select at least one slot",
    });
  }

  const existingBookings = await Booking.find({
    turf_id: req.body.turf_id,
    date: req.body.date,
  });

  const bookedSlots = existingBookings.flatMap((booking) => booking.slot);

  const conflict = req.body.slot.some((slot) => bookedSlots.includes(slot));

  if (conflict) {
    return res.status(400).send({
      success: false,
      message: "Selected slot already booked",
    });
  }

  await Booking.create(req.body);

  res.send({
    success: true,
    message: "Booking created successfully",
  });
};

let GetAllBooking = async (req, res) => {
  let id = req.params.id;
  let date = req.params.date;
  let result = await Booking.find({ turf_id: id, date: date }).populate(
    "turf_id",
  );
  res.send(result);
};

let GetAllBookingByTurfId = async (req, res) => {
  let turfid = req.params.id;
  let result = await Booking.find({ turf_id: turfid })
    .populate("turf_id")
    .populate("user_id")
    .exec();
  res.send(result);
};

let DeleteAllBooking = async (req, res) => {
  await Booking.deleteMany();
  res.send("deleted");
};

export { SaveBooking, GetAllBooking, DeleteAllBooking, GetAllBookingByTurfId };
