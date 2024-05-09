import mongoose from "mongoose";
import userModel from "./userSchema.js";
import { hashedPassword,comparedPassword } from "../../utility/hashedPassword.js";
import { ApplicationError } from "../../middleware/errorHandlerMiddlware.js";

export default class UserRepository{
    //..... user register
    async registerUser(name, email, password){
        try{
                const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
            if (!isStrongPassword) {
                throw new Error("Password must be at strong!");
            }

            let passwordHashed =await hashedPassword(password);
          
            const newUser = new userModel({name:name, email:email, password:passwordHashed});
            const savedUser=await newUser.save();
            return {success:true, msg:"registration sucessfull!"};
    
        }catch(error){
            if (error.code === 11000 && error.keyPattern.email) {
                // If the error is due to a duplicate email
                throw new Error("Email already exists. Please choose a different email.");
            } else {
                // For other errors, log the error and throw a generic error message
                console.log(error);
                throw error;
            }
        }
           
       }

       async login(email, password){
        try{
            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"Invalid email ID!"}
            }

           const comparedResult=await comparedPassword(password,user.password);

           if(!comparedResult){
            return {success:false, msg:"Invalid password !"}
           }

           return {success:true, msg:"Login successful !", user:user};



        }catch(error){
            //throw new Error("something went wrong please try later!");
            console.log("error.message : ", error.message);
            throw new Error(error.message);
        }
       }





}