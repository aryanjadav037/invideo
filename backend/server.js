import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); 
app.use(errorHandler);


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
