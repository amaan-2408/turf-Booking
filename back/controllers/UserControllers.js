import User from "../model/User.js";
import Booking from "../model/Booking.js";
import bcrypt from "bcrypt";

const SaveUser = async (req, res) => {
  try {
    delete req.body.repassword;

    // Hash password with bcrypt (cost factor 12 = ~250ms per hash on modern hardware)
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    await User.create(req.body);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, message: "Failed to create user" });
  }
};

let GetBookingByUserId = async (req, res) => {
  let id = req.obj._id;
  let result = await Booking.find({ user_id: id })
    .populate("turf_id")
    .populate("user_id");
  res.send(result);
};

let MyProfile = async (req, res) => {
  let id = req.obj._id;
  let result = await User.find({ _id: id }, "-password");
  res.send(result[0]);
};

let UpdateProfile = async (req, res) => {
  let id = req.obj._id;

  // Never let the user overwrite their password through the update endpoint
  // unless they specifically provide a new one (which should go through a
  // dedicated password-change route with its own auth check).
  if (req.body.password) {
    delete req.body.password;
  }

  let result = await User.updateMany({ _id: id }, { $set: req.body });
  res.send(result);
};

let DeleteAllUser = async (req, res) => {
  await User.deleteMany();
  res.send("deleted");
};

export {
  SaveUser,
  DeleteAllUser,
  GetBookingByUserId,
  MyProfile,
  UpdateProfile,
};
