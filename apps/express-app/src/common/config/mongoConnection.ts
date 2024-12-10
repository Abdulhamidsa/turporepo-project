import mongoose from "mongoose";
import { SECRETS } from "./config.ts";

export const connectMongoDB = async (): Promise<void> => {
  try {
    const url = SECRETS.mongoConnectionString;
    if (!url) {
      throw new Error("MongoDB connection string is not provided in SECRETS.");
    }

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(url);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to connect to MongoDB:", error.message);
    } else {
      console.error("❌ Failed to connect to MongoDB:", error);
    }
    process.exit(1);
  }
};
