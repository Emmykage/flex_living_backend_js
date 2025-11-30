import express from "express"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import reviewRouter from './routes/reviewRoutes.js';
import { ErrorHandler } from './middleware/errorHandler.js';
import cors from 'cors';

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors());

app.use('/api/reviews', reviewRouter);
app.use(ErrorHandler.handle);


console.log("Current working directory:", process.cwd());
console.log("Files in root:");
console.log(fs.readdirSync(process.cwd()));

console.log("Files in src:");
console.log(fs.readdirSync(path.join(process.cwd(), "src")));
const PORT = process.env.PORT || 500
app.listen(PORT, ()=> {
    console.log(`Server running on Port ${PORT}`)
})