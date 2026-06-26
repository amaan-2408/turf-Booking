import Turf from "../model/Turf.js";
import jwt from "jsonwebtoken"
import Path from "path"
import uniqueString from 'unique-string';
import { UPLOAD_DIR } from "../config/Config.js";

let GetAllTurf = async (req, res) => {
  let result = await Turf.find().populate("businessId").exec();
  res.send(result)
}

let GetTurfById = async (req, res) => {
  let id = req.params.id;
  let result = await Turf.find({ _id: id }).populate("businessId").exec();
  res.send(result[0])
}

let GetAllTurfByBusiness = async(req,res)=>{
  let id = req.obj._id;
  let result = await Turf.find({businessId:id});
  res.send(result)
}

const SaveAllTurf = async (req, res) => {
  let image=req.files.image;
  let arr=image.name.split(".");
  let ext=arr[arr.length-1]
  let str=uniqueString();
  let newname=str+"."+ext;
  // Write to <UPLOAD_DIR>/turf_images/<unique>.<ext> — UPLOAD_DIR defaults to
  // "assets" (relative to cwd) in dev and should be an absolute path in
  // production so files persist across deploys.
  const fs = await import("fs");
  const uploadRoot = Path.resolve(UPLOAD_DIR);
  const turfImagesDir = `${uploadRoot}/turf_images`;
  if (!fs.existsSync(turfImagesDir)) {
    fs.mkdirSync(turfImagesDir, { recursive: true });
  }
  let filepath = `${turfImagesDir}/${newname}`;
  await image.mv(filepath)
  
  req.body.businessId = req.obj._id;
  req.body.image=newname;
  let result = await Turf.create(req.body)
  res.send({ success: true, result: result })

}



let DeleteAllTurf = async (req, res) => {
  await Turf.deleteMany();
  res.send("deleted")
}
//SUCCESS:TRUE ISLIYE BHEJEGE KYOKI FRONT END WALE KO SMJH AYGA KI PROCESS KHTM HOGYI HAI

export { GetAllTurf, SaveAllTurf, DeleteAllTurf, GetTurfById ,GetAllTurfByBusiness}