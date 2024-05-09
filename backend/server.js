import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectMongodb from "./src/config/mongodbConfig.js";
import { ApplicationError } from "./src/middleware/errorHandlerMiddlware.js";
import userRoutes from "./src/feature/user/user.routes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import otpRoutes from "./src/feature/otp/otp.routes.js";
// ------import passport and session -------//
import session from "express-session";
import passport from "passport";
import googlePassportRouter from "./src/feature/authentication/googleAuth.js"


const app = express();


//------views and layout setup start------
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(),"src","views"));
app.use(expressEjsLayouts);
app.use(express.static("public"));
//------views and layout setup end--------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


//---------- setup express sesion --------//
app.use(session({
  secret:process.env.JWT_SECRET,
  resave:false,
  saveUninitialized:true,
  
}));


//--- setup passport --//
app.use(passport.initialize());
app.use(passport.session());

//....Routes for user
app.use("/api/user", userRoutes);

app.use("/api/otp", otpRoutes);
app.use("/auth/google", googlePassportRouter);

app.use("/", (req,res,next)=>{
  // res.render("signup");
 res.redirect("/api/user/signin");
})

// Error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
      return res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
      return res.status(err.code).send(err.message);
    }
  
    // server errors.
    res
      .status(500)
      .send(
        'Something went wrong, please try later'
      );
  });
  

app.listen(3200, ()=>{
    console.log("server is listening on port 3200");
    connectMongodb();
})