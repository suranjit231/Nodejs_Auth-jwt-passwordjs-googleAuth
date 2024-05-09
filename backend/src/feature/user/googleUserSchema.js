import mongoose from "mongoose";

const googleUserSchema =new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
},{timestamps:true});

const googleUserModel = mongoose.model("GoogleUser", googleUserSchema);

export default googleUserModel;