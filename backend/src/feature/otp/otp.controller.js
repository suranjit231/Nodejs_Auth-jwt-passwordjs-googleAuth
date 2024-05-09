import OtpRepository from "./otp.repository.js";

export default class OtpController{
   
    constructor(){
        this.otpRepository = new OtpRepository();
    }

     //---- get otp form for reset password
    async getOtpForm(req,res,next){

        res.status(200).render("otpForm", {jwtToken:null, error:null});
    }

     //---- get reset-password form for reset password
    async getResetPasswordForm(req,res,next){

        res.status(200).render("resetPasswordForm", {sucessMsg:null, jwtToken:null, error:null});
    }

    //---- get otp for reset password
    async sendOtp(req, res, next){
        try{
            const email = req.body.email;
            if(!email.trim()){
               return res.status(400).render("otpForm", { jwtToken:null, error:"Email is required!"});
            }

        const result = await this.otpRepository.sendOtp(email);
        if(!result.success){
           return res.status(400).render("otpForm", { jwtToken:null, error:result.msg});
        }

       return res.status(201).render("resetPasswordForm", 
        { jwtToken:null, error:null, sucessMsg:result.msg});

        }catch(error){
            console.log(error);
        }
    }


    //---- verify otp and and reset password
    async verifyOtpAndResetPassword(req,res,next){
        try{
            const {email, password, otp} = req.body;
            console.log("req.body verify otp: ", req.body);
            
            //-- checking if input is emapty
            if(!email || !password || !otp){
                return res.status(201).render("resetPasswordForm", 
                {loginResult:null, jwtToken:null, error:"Empty input field!", sucessMsg:null});
            }

            //--- checking if password or confirm-password match
            // if(password !== confirmPassword){
            //     return res.status(201).render("resetPasswordForm", 
            //      {loginResult:null, jwtToken:null, error:"Password and confirm-password not matched!", sucessMsg:null});
            // }



           const result=await this.otpRepository.verifyOtpAndUpdatePassword(email,otp,password);
           if(!result.success){
            return res.status(201).render("resetPasswordForm", 
            {loginResult:null, jwtToken:null, error:result.msg, sucessMsg:null});


           }else{
            return res.status(201).render("signin", 
            {loginResult:null, jwtToken:null, error:null, sucessMsg:result.msg});
           }

        }catch(error){
            console.log("verify password error: ", error);
        }
    }
}
