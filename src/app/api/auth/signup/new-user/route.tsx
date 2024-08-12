import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, imageUrl } = await req.json();

    await dbConnect();

    const image = imageUrl;
    const user = await User.create({ email, password, name, image });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
