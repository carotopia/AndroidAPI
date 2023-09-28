import express from 'express';
import morgan from 'morgan';
import authRoutes from './src/routes/auth_routes.js';
import cookieParser from 'cookie-parser';
//import postsRoutes from './src/routes/posts_routes.js';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);

//app.use("/api",postsRoutes);



export default app;