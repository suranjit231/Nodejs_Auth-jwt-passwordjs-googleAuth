import mongoose from "mongoose";

//.... methds for connecting mongodb data-base
const connectMongodb= async()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/NodejsAuthenticaton", {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log("mongodb is connected!");

    }catch(error){
        console.log("Mongodb connection error: ", error);
    }
}

export default connectMongodb;