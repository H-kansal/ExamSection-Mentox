import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

 const ConnectDb=async()=>{
    try{
        const ConnectInstance=await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`your mongo connection is successful ${ConnectInstance.connection.host}`)
    }
    catch(error){
         throw new ApiError(500,"Db Connection Failed");
    }
 }
export default ConnectDb;