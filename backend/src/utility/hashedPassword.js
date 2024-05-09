import bcrypt from "bcrypt";

//.... hashed password useing bcrypt
export async function hashedPassword(password){

    try{
        const hashed_Password =await bcrypt.hash(password, 12);
        return hashed_Password;
    }catch(error){
        console.log("hashed password error: ", error);
    }
    

}

//........compared password using bcrypt
export async function comparedPassword(password, hashedPassword){
    try{
        const compaedResult= await bcrypt.compare(password, hashedPassword);
        return compaedResult;

    }catch(error){
        console.log("compared password error: ", error);
    }

}