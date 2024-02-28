import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ],
  totalPrice: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;