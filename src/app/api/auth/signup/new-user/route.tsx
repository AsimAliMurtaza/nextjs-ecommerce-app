import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      imageUrl,
      address,
      gender,
      country,
      dob
    } = await req.json();

    console.log("Creating user with email:", email, "name:", name, "address:", address, "dob", dob);

    // Ensure that all required fields are provided
    if (!email || !password || !name || !address || !gender || !country || !dob) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create a new user with all provided attributes
    const user = await User.create({
      email,
      password,
      name,
      image: imageUrl,
      address,
      gender,
      country,
      dob
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
