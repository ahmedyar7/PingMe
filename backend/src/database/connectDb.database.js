import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `✅ Connected To Database with HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("❌ Failed To Connect to the Database");
  }
};

export { connectDb };
