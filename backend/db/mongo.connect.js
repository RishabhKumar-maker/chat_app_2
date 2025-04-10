import mongoose from "mongoose"
const connectToMongodb = async() =>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("Error connecting to mongoDB",error.message)
    }
}

export default connectToMongodb
