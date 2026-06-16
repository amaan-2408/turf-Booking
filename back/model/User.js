import mongoose from "../db/Connect.js";

const UserSchema=mongoose.Schema({
name:String,
address:String,
email:String,
password:String,


},{timestamps:true });

const User=mongoose.model("user",UserSchema)
export default User

