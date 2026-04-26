import mongoose from "mongoose";


import {DB_URI, NODE_ENV} from "../config/env";


const databaseUri = DB_URI;

if(!databaseUri) {
    throw new Error("DB_URI is not defined in environment variables");
}


const connectToDatabase = async () => {

    try {
        await mongoose.connect(databaseUri)
        console.log(`Connected to database in ${NODE_ENV} mode`)
    } catch (error) {
        console.error(error)
      
        process.exit(1)
    }
}


export default connectToDatabase