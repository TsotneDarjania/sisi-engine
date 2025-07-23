import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.mongoURI || "");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
