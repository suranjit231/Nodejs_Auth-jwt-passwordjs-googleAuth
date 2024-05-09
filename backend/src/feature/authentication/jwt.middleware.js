import jwt from "jsonwebtoken";

//.... jwt auth middleware
const auth = async (req,res,next)=>{
    console.log("Unauthorized!, please provide authorization token to access sceret routes before");
    const {jwtToken} = req.cookies

    if(!jwtToken){
       // res.status(404).send("Unauthorized!, please provide authorization token to access sceret routes!")

       console.log("Unauthorized!, please provide authorization token to access sceret routes!");
       return res.redirect("/signin")
    }

    jwt.verify(jwtToken, "QcoayJBMZWtaicB79Fv6akKTcHKa0v0Z", (err, data)=>{
        if(err){
            return res.status(404).send("Unauthorized token!")

        }else{
            req.userId = data.userId;
            next();
        }

    })
}

export default auth;