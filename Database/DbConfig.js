import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()


const connectDB = async() => {
    const mongoUrl = process.env.MONGODBCONNECTIONSTRING
    const connection = await mongoose.connect(mongoUrl)
    console.log("MongoDB Conected");

    return connection;
}

export default connectDB