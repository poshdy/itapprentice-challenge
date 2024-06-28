import "dotenv/config";
import Mongoose from "mongoose";
const uri = process.env.MONGO_DB_CONNECTION_URL;

export const connectDb = async () => {
  try {
    const connection = await Mongoose.connect(uri, {
      maxPoolSize: 8,
    });
    console.log(
      `Connected to Mongodb Successfully host: ${connection.connection.host}:${connection.connection.port}`
    );
  } catch (error) {
    throw new Error(`connection db: ${error}`);
  }
};
