import express, { response } from "express";
import mongoose from "mongoose";
import "dotenv/config"
import { Book } from "./models/bookmodels.js";

const MONGODBURI = process.env.MONGODB_URI
const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.get('/', (request, response) =>{
    return response.status(200).send('Welcome to Bookstore');
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

app.post('/books', async (request, response) =>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        
        return response.status(201).send(book);
    } catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});  
    }
})

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