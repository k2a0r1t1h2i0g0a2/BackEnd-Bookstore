import Payment from "../Models/Payment.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const checkout = async (req, res) => {
  //const { amount } = req.body;

  try {
    const { price } = req.body; // Retrieve the amount from the request body

    // let totalAmount = 0;
    // for (const cartItem of cart) {
    //   for (const item of cartItem.items) {
    //     totalAmount += item.price;
    //   }
    // }
    const amount = price * 100;
    const currency = "INR";
    const payment_capture = 1;

    const options = {
      amount,
      currency,
      payment_capture,
    };

    const response = await instance.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Unable to create Razorpay order" });
  }
};

export const paymentVerification = async (req, res) => {
  // Extract required fields from request body
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Log request details for debugging purposes
  console.log("Request body:", req.body);
  console.log("Razorpay Order ID:", razorpay_order_id);
  console.log("Razorpay Payment ID:", razorpay_payment_id);
  console.log("Razorpay Signature:", razorpay_signature);

  try {
    // Retrieve the crypto secret from environment variables
    const cryptoSecret = process.env.CRYPTO_SECRET;

    // Construct the expected signature using the received order ID and payment ID
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Generate the HMAC SHA256 signature using the crypto secret
    const generatedSignature = crypto
      .createHmac("sha256", cryptoSecret)
      .update(body)
      .digest("hex");

    // Log intermediate values for debugging
    console.log("Expected Signature:", razorpay_signature);
    console.log("Generated Signature:", generatedSignature);

    // Compare the generated signature with the expected signature
    const isAuth = generatedSignature === razorpay_signature;

    // Log the verification result
    console.log("Verification Result:", isAuth);

    if (isAuth) {
      // If the signature is verified, create a new Payment entry
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      // Respond with success status
      res.json({ success: true, message: "payment verification completed" });
    } else {
      // If verification fails, respond with error status
      res
        .status(400)
        .json({ success: false, error: "Payment verification failed" });
    }
  } catch (error) {
    // If an error occurs during verification, log the error and respond with an internal server error status
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
