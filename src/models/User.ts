import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the User model
interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  image?: string;
  address: string;
  gender: string;
  country: string;
  dob: string; // Use a string or Date type based on your preference
}

// Define the User schema
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  dob: {
    type: String, // Consider using Date if you prefer date type
    required: true,
  },
});

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
