// auth/googleAuth.js
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import userModel from "../user/userSchema.js";
import jwt from "jsonwebtoken";
import { hashedPassword } from "../../utility/hashedPassword.js";

const googleRoutes = express.Router();

const OAuth2Strategy = Strategy;

passport.use(
  new OAuth2Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("user profile: ", profile);
    try {
      let user = await userModel.findOne({ email: profile.email });

      if (!user) {
        //---- if not user found then create a user and random password and store in data-base
        const randomPassword = Math.random().toString(36).slice(-8);
        const passwordHashed = await hashedPassword(randomPassword);
        user = new userModel({
          name:profile.displayName,
          email:profile.email,
          password:passwordHashed,
        });
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});



googleRoutes.get("/", passport.authenticate("google", {scope:["profile", "email"]}));

// Route for handling Google authentication callback
googleRoutes.get("/callback", passport.authenticate("google", {
  failureRedirect: "/api/user/signin" 
}), (req, res) => {
  // Access the user and token from the passport session
  const { user, token } = req.session.passport.user;

  // Set JWT token as HTTP-only cookie
  res.cookie("jwtToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

  // Redirect to protected route
  res.redirect("/api/user/protected");
});




export default googleRoutes;
