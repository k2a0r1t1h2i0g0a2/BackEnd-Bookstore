import Book from "../Models/Book.model.js";
import mongoose from "mongoose";

export const addNewBook= async (req,res)=>{

    try {
         const { name, image, description, price } = req.body;
         const newBook = new Book({ name, image, description, price });
         const savedBook = await newBook.save();
        res
          .status(201)
          .json({ message: "New Books Added Successfully",savedBook});
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

export const getAllBook = async (req,res) => {
    try {
         const books = await Book.find();
         res
           .status(200)
           .json({
             message: "list all Books",
              books,
           });
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

export const getBookById = async (req,res) => {
     try {

          const bookId = req.params.id
          const book = await Book.findById(bookId);
          console.log("req.params.id",req.params.id);
          if (!book || !book.available) {
               return res.status(404).json({ message: 'Book not found' });
             
          } res.json(book)
     } catch (error) {
                  res.status(500).json({ error: error.message });

     }
}