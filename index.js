import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/paymentRoutes.js'



dotenv.config();

const port = process.env.PORT || 3000
connectDB();

const app = express()
app.use(cookieParser());


app.use(cors({
    origin: '*',
    // origin: 'https://imarticus-lms.vercel.app',
    credentials: true,
}))
app.use(express.json());

app.use('/api/courses', courseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);


app.listen(port, ()=>{console.log(`Server running on PORT: ${port}`)});


