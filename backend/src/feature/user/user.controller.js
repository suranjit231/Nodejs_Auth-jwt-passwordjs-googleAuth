import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import userModel from "./userSchema.js";
import googleUserModel from "./googleUserSchema.js";

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }

    //.... register user methods
   async signup(req,res,next){
    try{
        const userData=req.body;
        console.log("req.body user register: ", userData);
                 const {name, email, password}=req.body;

        if(!userData.name.trim() || !userData.email.trim() || !userData.password.trim()){
          let error="Error empty input!";
         // return res.status(400).send("invalid input")
         return res.render("signup", {sucessMsg:null, error:error, jwtToken:null});
        }


        const newUser = await this.userRepository.registerUser(name,email,password);

        if(newUser.success){
           // return res.status(201).send(newUser);
            return res.render("signin", {sucessMsg:newUser.msg, error:null, jwtToken:null});
        }

    }catch(error){
      if (error.message.includes("Email already exists")) {
        let error = "Error: Email already exists!";

        return res.render("signup", {error:error, sucessMsg:null, jwtToken:null});
    } else {
        // For other errors, render a generic error message
        return res.render("signup", { error: error.message, sucessMsg:null, jwtToken:null });
    }
    }

}

  //..... user signin controller
  async signin(req,res,next){
    try{
        const {email, password} = req.body;
        if(!email || !password){
          //  return {success:false, msg:"Email or password is reqird!"};
            return res.render("signin", {sucessMsg:null, error:"Email or password is reqird!", jwtToken:null});
        }

       const loginResult=await this.userRepository.login(email, password);
       console.log("login result: ", loginResult);

       if(!loginResult.success){
        //return res.status(404).send(loginResult);

        return res.render("signin", {sucessMsg:null, error:loginResult.msg, jwtToken:null});
       }

       const token = jwt.sign(
                {userId:loginResult.user._id, email:loginResult.user.email},
                "QcoayJBMZWtaicB79Fv6akKTcHKa0v0Z",
                {expiresIn:"2h"}
                );
                
       return res.status(200).cookie("jwtToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).render("protectedView", {loginResult:loginResult.user, jwtToken:token});

    }catch(error){
        res.status(404).send(error.message);

        return res.render("signin", {sucessMsg:null, error:error.message, jwtToken:null});
    }
  }


   //...... user logout controller
   async logout(req,res,next){
    try {
       
        req.session.destroy();
       res.clearCookie('jwtToken').render("signin", {sucessMsg:"Logout sucssful!", error:null, jwtToken:null});
      


    } catch (error) {
        next(error); 
    }
}

async showProctectedPage(req,res,next){
    try{
        const userId = req.userId;
        console.log("userId: ", userId);
        let user = await userModel.findOne({_id:userId});
        console.log("user is : ", user);

         res.render("protectedView", {loginResult:user, jwtToken:user});

    }catch(error){
        console.log(error);
    }
}


}