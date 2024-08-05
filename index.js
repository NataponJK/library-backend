import express, { response } from "express";
import mongoose from "mongoose";
import "dotenv/config"
import { Book } from "./models/bookmodels.js";
import booksRoute from './routes/booksRoutes.js'

const MONGODBURI = process.env.MONGODB_URI
const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.get('/', (request, response) =>{
    return response.status(200).send('Welcome to Bookstore');
});

app.use('/books', booksRoute);

mongoose
    .connect(MONGODBURI)
    .then(()=>{
        console.log(`App connected to database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });