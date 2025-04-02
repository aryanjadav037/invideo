import express from 'express';;
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//oye jadu amrishpuri bol riya hu

connectDB();
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
});
