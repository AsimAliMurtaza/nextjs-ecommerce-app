import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string; // Make image optional
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  image: {
    type: String,
    required: false, // Make image optional
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
