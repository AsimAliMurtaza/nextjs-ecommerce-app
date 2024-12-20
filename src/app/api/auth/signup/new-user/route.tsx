import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    console.log("Creating user with email:", email, "name:", name);

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.create({
      email,
      password,
      name,
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
