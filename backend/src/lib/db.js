import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected successfully")
    } catch (error) {
        console.log(error)
    }
}