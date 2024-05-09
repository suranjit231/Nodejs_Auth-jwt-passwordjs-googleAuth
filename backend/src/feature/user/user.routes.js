import express from "express";
import UserController from "./user.controller.js";

import auth from "../authentication/jwt.middleware.js";


const userRoutes = express.Router();
const userController = new UserController();

//----- get views for signin and signup
userRoutes.get("/signup", (req,res,next)=>{
    res.render("signup", {sucessMsg:null, error:null, jwtToken:null});

})

userRoutes.get("/signin", (req,res,next)=>{
    res.render("signin", {sucessMsg:null, error:null, jwtToken:null});

})

userRoutes.get("/logout", (req,res,next)=>{
    userController.logout(req,res,next);
})


//....user signup routes
userRoutes.post("/signup", (req,res,next)=>{
    userController.signup(req,res,next);
});

//.... users ignin routes
userRoutes.post("/signin", (req,res,next)=>{
    userController.signin(req,res,next);
})

userRoutes.get("/protected",auth, (req,res,next)=>{
   // res.render("protectedView", {loginResult:loginResult, jwtToken:token});
   console.log("req.body: ", req.body)
   userController.showProctectedPage(req,res,next);

})

userRoutes.get("/google", (req,res,next)=>{
   
 console.log("hello this is login from google...");
 })


export default userRoutes;