import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from "cors";
import ImageRoutes from './routes/imageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import CookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// Rate Limiter: Apply to all requests
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20,                 // limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);


app.use(express.json()); 
app.use(CookieParser()); 
app.use(
  cors({
    origin: ['https://invideo-eta.vercel.app/', "http://localhost:5173"],
    credentials: true,

  })
);
app.options('', cors());
app.use('/api/auth', authRoutes);
app.use('/api/image', ImageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/collection', collectionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
