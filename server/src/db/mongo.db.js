import { connect } from "mongoose";

const connectToMongoDB = async () => {
    try {
        const connectionInstance = await connect(process.env.MONGO_URI)
        console.log(`Database Connection Successful! Host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database Connection Error! : ", error.message);
        process.exit(1)
    }
}

export default connectToMongoDB;