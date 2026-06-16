import Booking from "../model/Booking.js";
import Business from "../model/Business.js";
import Turf from "../model/Turf.js";
import bcrypt from "bcrypt";

let SaveBusiness = async (req, res) => {
  try {
    delete req.body.repassword;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    await Business.create(req.body);
    res.send({ success: true });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Failed to create business" });
  }
};

let BusinessMyProfile = async (req, res) => {
  let id = req.obj._id;
  let result = await Business.find({ _id: id }, "-password");
  res.send(result[0]);
};

let GetAllBookingByBusinessId = async (req, res) => {
  let bid = req.params.id;
  let result_turf = await Turf.find({ businessId: bid });
  let result = await Promise.all(
    result_turf.map(async (item) => {
      let arr = await Booking.find({ turf_id: item._id });
      return arr;
    }),
  );
  res.send(result);
};

let BusinessUpdateProfile = async (req, res) => {
  let id = req.obj._id;

  // Don't let the user overwrite their password through this endpoint
  if (req.body.password) {
    delete req.body.password;
  }

  let result = await Business.updateMany({ _id: id }, { $set: req.body });
  res.send(result);
};

let DeleteAllBusiness = async (req, res) => {
  await Business.deleteMany();
  res.send("deleted");
};

export {
  SaveBusiness,
  DeleteAllBusiness,
  BusinessMyProfile,
  GetAllBookingByBusinessId,
  BusinessUpdateProfile,
};
