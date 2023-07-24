import express from "express";
import  connection  from "./config/dbConnect.js";
import dotenv from "dotenv";
import bodyParser from "body-parser"; 
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

//configuration
app.use(express.json());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// DB CONNECTION

connection();

// routes
app.use("/", userRoutes);
app.use("/auth", authRoutes)

// start
const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>{ console.log(`App Listening on ${PORT}`);})
