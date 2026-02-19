import mongoose from "mongoose";

const DbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"ticketbookingApp"
        }
        );
        console.log("Database is Connected");
    } catch (error) {
        console.log(error);
    }
}

export default DbConnection;