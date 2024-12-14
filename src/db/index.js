import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config(); 

async function connectDb() {
    try {
        if (!process.env.MONGODB_URI || !DB_NAME) {
            throw new Error("MONGODB_URI or DB_NAME is not set in the environment variables");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected hogyaa bhai: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); // Log the error
        process.exit(1); // Exit the process with failure code
    }
}

export default connectDb;
