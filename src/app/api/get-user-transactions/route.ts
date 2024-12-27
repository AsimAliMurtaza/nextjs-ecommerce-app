import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Import your NextAuth options
import TransactionModel from "@/models/Transaction"; // Import the Transaction model

export async function GET(req: NextRequest) {
  try {
    // Get the session details
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Fetch transactions based on the user's email
    const transactions = await TransactionModel.find({
      email: session.user.email,
    }).exec();

    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
