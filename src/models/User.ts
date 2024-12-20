import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  image?: string;
  address?: string;
  gender?: string;
  country?: string;
  dob?: string;
}

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
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  dob: {
    type: String, // Consider using Date if you prefer date type
    default: "",
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
