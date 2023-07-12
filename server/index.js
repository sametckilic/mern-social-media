import express from "express";
import mongoose from "mongoose";
import  connection  from "./config/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());


// DB CONNECTION

connection();

// start
const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>{ console.log(`App Listening on ${PORT}`);})
