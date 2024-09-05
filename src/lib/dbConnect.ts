import mongoose from "mongoose";

type connecton ={
    isConnected?: number
}

const connectonObj:connecton={}

async function dbConnect():Promise<void> {
    if(connectonObj.isConnected){
        console.log("Already connected to database");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI||"",{});
        connectonObj.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    }catch(error){
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}
export default dbConnect;