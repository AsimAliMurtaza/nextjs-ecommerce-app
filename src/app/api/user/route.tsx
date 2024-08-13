import { getServerSession } from "next-auth/next"; // Adjust import as needed
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Ensure method is POST
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  const session = await getServerSession(); // Adjust based on your session management

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { username, email, gender, country, address, dob, password, newPassword } = await req.json();

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user fields
    user.name = username || user.name;
    user.email = email || user.email;
    user.password = newPassword || user.password;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.address = address || user.address;
    user.dob = dob ? new Date(dob) : user.dob; // Convert dob to Date if provided


    await user.save();

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
