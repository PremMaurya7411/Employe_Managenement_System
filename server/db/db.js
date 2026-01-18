import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("MongoDB connection error:", error.message || error);
    throw error;
  }
};

export default connectToDatabase;
