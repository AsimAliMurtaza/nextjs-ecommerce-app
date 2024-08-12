import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse,NextRequest } from "next/server";
import { uploadImage } from "@/lib/uploadImage"; // Import your uploadImage function

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { email, password, name, imageUrl } = await req.json(); 
    console.log("imageUrl",imageUrl);

    // Connect to MongoDB
    await dbConnect();

    const image = imageUrl;
    // Create a new user in MongoDB with the image URL
    const user = await User.create({ email, password, name, image });

    // Return the created user as a JSON response
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    // Return an error response
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
