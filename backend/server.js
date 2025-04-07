import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from "cors";
import ImageRoutes from './routes/imageRoutes.js';
import CookieParser from 'cookie-parser';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); 
app.use(errorHandler);
app.use(CookieParser()); 
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use('/api/auth', authRoutes);
app.use('/api/image', ImageRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
