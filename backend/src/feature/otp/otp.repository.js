import mongoose from "mongoose";
import otpModel from "./otpSchema.js";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import userModel from "../user/userSchema.js";
import { hashedPassword } from "../../utility/hashedPassword.js";

export default class OtpRepository{

    //..... methods for send otp to email for reset password
    async sendOtp(email){
        try{

            //--- find user by email
            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"No user found!"}
            }

            //.. if user  found create transpost for sending otp in email
    const otp= otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"codingninjas2k16@gmail.com",
            pass:"slwvvlczduktvhdj"
        }
    });

    const mailOptions ={
        from:"codingninjas2k16@gmail.com",
        to:"namasudrasuranjit164@gmail.com",
        subject:"Password reset Otp",
        text:`Your password reset OTP is ${otp}`,
    }

    await transporter.sendMail(mailOptions);
    console.log("otp sends sucessfully");

    //--- check is there any existing otp in users
    const existingOtp = await otpModel.findOne({user:user._id});

    //---- if not create new otp docs
    if(!existingOtp){
        const newOtpDocs = new otpModel({
            otp:otp,
            status:"sending",
            user:user._id,
        });

        const savedOtpDocs = await newOtpDocs.save();
        user.otp = savedOtpDocs._id;
        await user.save();

        return {success:true, msg:"Otp sends sucessfully!"}

    }

    //-- if any existing otp then update otp when resend otp
    existingOtp.otp = otp;
    await existingOtp.save();
    return {success:true, msg:"Otp sends sucessfully!"}

        }catch(error){
            console.log("sendOtp error: ", error);
        }

    }


    //---- verify the otp and update password
    async verifyOtpAndUpdatePassword(email, otp, password){
        try{
            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"invalid email ID!"};
            }

            const otpDocs = await otpModel.findOne({user:user._id});
            if(!otpDocs){
                return {success:false, msg:"No OTP is sends with this email ID!"};
            }

            otp = Number(otp);
            console.log("otp ")
            if(otpDocs.otp === otp){
                //-- check here that is otp is expired by the current
                // time stamp and when otp created time-stamp it should not exceed 5 min

                const otpCreatedAt = otpDocs.updatedAt;
                const currentTime = new Date();
                const timeDifference = currentTime - otpCreatedAt; 
                const timeDifferenceInMinutes = timeDifference / (1000 * 60); 
                console.log("timeDifferent in minutes: ", timeDifferenceInMinutes);

            if(timeDifferenceInMinutes > 5){

                return {success:false, msg:"OTP has expired!"};

            } else {

                // OTP is valid so reset the password and delete the otpDocs
                let passwordHashed =await hashedPassword(password);
                user.password=passwordHashed;
                await user.save();

                await userModel.updateOne({ _id:user._id }, { $unset: { otp: "" } });
                // Delete OTP document
                await otpModel.deleteOne({ _id: otpDocs._id });
                return {success:true, msg:"Password reset successfully!"};

            }

            }else {
                return {success:false, msg:"Invalid OTP!"};
            }

        }catch(error){
            console.log("sendOtp error: ", error);
        }
    }


}