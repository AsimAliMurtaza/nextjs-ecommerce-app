import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { email, updates } = await req.json();

    // Validate the input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { message: "Updates must be an object" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },                // Query to find the user
      { $set: updates },        // Update fields
      { new: true }             // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Respond with the updated user
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
