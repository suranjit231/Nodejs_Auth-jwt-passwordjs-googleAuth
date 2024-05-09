import express from "express";
import OtpController from "./otp.controller.js";

const otpRoutes = express.Router();
const otpController = new OtpController();

otpRoutes.get("/getOtpForm", (req,res,next)=>{
    otpController.getOtpForm(req,res,next);
});

otpRoutes.get("/getPasswordResetForm", (req,res,next)=>{
    otpController.getResetPasswordForm(req,res,next);
});

otpRoutes.post("/sendOtp", (req,res,next)=>{
    otpController.sendOtp(req,res,next);
});

otpRoutes.post("/verifyOtp-resetPassword", (req,res,next)=>{
    otpController.verifyOtpAndResetPassword(req,res,next);
});

export default otpRoutes;