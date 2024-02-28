import Cart from "../Models/Cart.model.js";
import Book from "../Models/Book.model.js";






export const addBookToCart = async (req, res) => {
  try {
    // Extract userId from the authenticated user's session or token
    const userId = req.user.id; // Assuming the user ID is stored in req.user
console.log(userId);
    // Assuming bookId and quantity are sent in the request body
    const { bookId, quantity } = req.body;

    console.log("Incoming request to add book to cart:", req.body);
    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find the book details
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book already exists in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.bookId.equals(bookId)
    );

    if (existingItemIndex !== -1) {
      // Update quantity and price if the book exists
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price += book.price * quantity;
    } else {
      // Add the book as a new item
      cart.items.push({ bookId, quantity, price: book.price * quantity });
    }

    // Calculate the total price of the cart
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    await cart.save();

    console.log("Book added to cart successfully:", cart);

    res.status(200).json({ message: "Book added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getusercart = async (req, res) => {
  try {
    // Query all carts
    const carts = await Cart.find().populate("items.bookId")
console.log(carts);
    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
   
};

export const removecart = async (req, res) => {
  try {
    const {  bookId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for user" });
    }

    // Find the index of the book in the cart
   const bookIndex = cart.items.findIndex((item) => item.bookId.equals(bookId));
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // Remove the book from the cart
    cart.items.splice(bookIndex, 1);

    // Calculate the total price of the cart
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ message: "Book removed from cart successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

