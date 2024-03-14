import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

// Cors policy
app.use(cors());

// Connect Database
connectDB();

// JSON parsing middleware
app.use(express.json());



// Load Routes
app.use(authRoutes);
app.use(productRoutes);
// app.use(profileRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});



