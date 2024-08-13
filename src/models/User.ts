// src/models/User.ts

import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  dob: { type: Date, required: true },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
