import mongoose from "mongoose";

export default async function connectDB() {
  const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/abc";

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.warn("MongoDB not available; continuing without a database connection.");
    console.warn(error instanceof Error ? error.message : error);
  }
}
