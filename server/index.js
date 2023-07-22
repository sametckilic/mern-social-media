import express from "express";
import  connection  from "./config/dbConnect.js";
import dotenv from "dotenv";
import { register } from "./controllers/auth.js"
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

app.use(express.json());


// DB CONNECTION

connection();

// routes

app.use("/auth", authRoutes)

// start
const PORT = process.env.PORT || 6000;

app.post("/auth/register", register)

app.listen(PORT, () =>{ console.log(`App Listening on ${PORT}`);})
