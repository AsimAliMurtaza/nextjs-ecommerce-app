import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { message: "Failed to get user" },
      { status: 500 }
    );
  }
}