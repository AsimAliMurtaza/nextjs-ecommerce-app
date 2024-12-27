import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import TransactionModel from "@/models/Transaction";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function GET(req: NextRequest) {
  try {
    // Get sessionId from the query parameters
    const sessionId = req.nextUrl.searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    // Use session details to create a transaction record
    const transaction = new TransactionModel({
      receiptId: session.id,
      username: session.metadata?.username || "Guest",
      email: session.customer_email || "",
      products: JSON.parse(session.metadata?.cart || "[]").map((item: any) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
      })),
      totalAmount: (session.amount_total ?? 0) / 100, // Convert from cents to dollars
      transactionDate: new Date(),
    });

    console.log("Transaction:", transaction);

    // Save the transaction to MongoDB
    await transaction.save();

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error("Error retrieving session or saving transaction:", error);
    return NextResponse.json(
      { error: "Transaction processing failed" },
      { status: 500 }
    );
  }
}
