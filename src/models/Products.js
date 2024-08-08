// src/models/Product.js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
  onSale: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  specifications: {
    material: String,
    sleeveLength: String,
    fit: String,
    careInstructions: String,
  },
  reviews: [
    {
      name: String,
      date: Date,
      rating: Number,
      comment: String,
    },
  ],
});

export default mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);
