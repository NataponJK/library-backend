import express, { response } from "express";
import mongoose from "mongoose";
import "dotenv/config"
import { Book } from "./models/bookmodels.js";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const ORIGIN_URL = process.env.ORIGIN_URL

const app = express();

//Allow All Origins with Default of cors(*)
app.use(cors());
//Allow by Custom Origins
// app.use(cors({
//     origin: `${ORIGIN_URL}`,
//     method: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.use(express.json());

app.get('/', (request, response) =>{
    return response.status(200).send('Welcome to Bookstore');
});

app.use('/books', booksRoute);

mongoose
    .connect(MONGODB_URI)
    .then(()=>{
        console.log(`App connected to database`);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });