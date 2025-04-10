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

// ✅ Connect DB
connectDB();

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Middleware
app.use(express.json());
app.use(CookieParser());

// ✅ CORS
app.use(
  cors({
    origin: ["https://invideo-eta.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/image', ImageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/collection', collectionRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Error Handler
app.use(errorHandler);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
