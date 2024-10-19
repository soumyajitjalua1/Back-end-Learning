// require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";


import  configDotenv  from "dotenv";
import connectDB from "./db/index.js";


configDotenv.config({
    path: './env'
})
connectDB()





// const app = express();

// (async () => {
//     try {
//         // Connect to MongoDB using template literals and backticks
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Database connected");

//         // Start the Express server
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.log("Error: ", error);
//         // You can optionally exit the process if there's a critical error
//         process.exit(1);
//     }
// })();
