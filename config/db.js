import mongoose from "mongoose"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected to Mongodb");
    } catch (error) {
        console.log(error.message,"failed to connect");
    }
}

export default connectDB