import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected!! HOST_NAME:${connectionInstance.connection.host}`);
    }
    catch(error) {
        console.error(`MongoDB Connection Error: ${error}`);
        process.exit(1);
    }
}

export { connectDB };