import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import ImageRoutes from './routes/imageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import CookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests, try again later.",
});
app.use(limiter);

// ✅ CORS SETUP - Make sure this comes BEFORE all routes
const allowedOrigins = ["https://invideo-eta.vercel.app", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware to handle OPTIONS preflight for all routes
app.options('*', cors());

// Middlewares
app.use(CookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/image', ImageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/collection', collectionRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handler
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});