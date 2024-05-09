import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
    },

    status:{
        type:String,
        enum:["sending", "verified", "expired"]
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true});

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel;