import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
const connectDb = async () => {
  try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
          serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
          socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      });
      console.log(`\n MongoDB connected: DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
      console.log("MongoDB connection error", error);
      process.exit(1);
  }
};
export default connectDb