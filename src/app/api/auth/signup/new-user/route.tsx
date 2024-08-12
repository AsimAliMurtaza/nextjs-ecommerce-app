import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name, image } = await req.json(); // Extract image from request body

  try {
    await dbConnect();

    const user = await User.create({ email, password, name, image }); // Store image as Base64 string

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
