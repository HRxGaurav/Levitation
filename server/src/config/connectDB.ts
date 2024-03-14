import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Db_Link: string | undefined = process.env.DATABASE;

const connectDB = async (): Promise<void> => {
    try {
        if (!Db_Link) {
            throw new Error("Database connection string not found in environment variables");
        }

        await mongoose.connect(Db_Link);
        console.log("DB has been connected successfully");
    } catch (error) {
        console.log(`Failed to connect: ${error}`);
    }
};

export default connectDB;
