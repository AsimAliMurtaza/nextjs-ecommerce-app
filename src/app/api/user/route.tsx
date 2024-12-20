import { getServerSession } from "next-auth/next"; // Adjust import as needed
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  const session = await getServerSession(); 

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, name, gender, country, address, dob, newPassword } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = newPassword || user.password;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.address = address || user.address;
    user.dob = dob ? new Date(dob) : user.dob;


    await user.save();

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
