import { Schema, model, Document, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Optional for generating UUIDs

interface TransactionProduct {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Transaction extends Document {
  receiptId: string;
  username: string;
  email: string;
  products: TransactionProduct[];
  totalAmount: number;
  transactionDate: Date;
  paymentStatus: string; // New field
}

// Define the schema for the transaction
const TransactionSchema = new Schema<Transaction>({
  receiptId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4, // Use UUID for globally unique IDs
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Simple email validation
      message: "Invalid email format",
    },
  },
  products: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is at least 1
      price: { type: Number, required: true, min: 0 }, // Ensure price is non-negative
      imageUrl: { type: String, required: true },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0, // Ensure totalAmount is non-negative
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"], // Restrict to valid statuses
    default: "completed", // Default to 'completed' for successful payments
  },
});

// Check if the model already exists to prevent redefinition
const TransactionModel =
  models.Transaction || model<Transaction>("Transaction", TransactionSchema);

export default TransactionModel;
