import express from "express"
import dotenv from "dotenv"

import reviewRouter from './routes/reviewRoutes.js';
import { ErrorHandler } from './middleware/errorHandler.js';
import cors from 'cors';

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors());

app.use('/api/v1/reviews', reviewRouter);
app.use(ErrorHandler.handle);


const PORT = process.env.PORT || 500
app.listen(PORT, ()=> {
    console.log(`Server running on Port ${PORT}`)
})