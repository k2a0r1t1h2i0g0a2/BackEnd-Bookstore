
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  available: { type: Boolean, default: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book