import express from "express";
import morgan from "morgan";
import authRoutes from "./src/routes/auth_routes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import postsRoutes from './src/routes/posts_routes.js';

dotenv.config();
const LOCAL_PORT = 3000;
//require("dotenv").config();

export const connectDB = async () => {
  try {
    // Usar la variable de entorno para la conexión a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

//app.use("/api",postsRoutes);

connectDB();
app.listen(process.env.PORT || LOCAL_PORT);
console.log("Server on port", process.env.PORT || LOCAL_PORT);
