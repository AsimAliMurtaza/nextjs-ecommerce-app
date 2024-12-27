import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { cart, username, email } = await req.json();

    // Validate required fields
    if (!cart || !username || !email) {
      return NextResponse.json(
        { error: "Missing required fields: cart, username, or email." },
        { status: 400 }
      );
    }

    // Validate the cart
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart must be a non-empty array." },
        { status: 400 }
      );
    }

    // Map cart items to Stripe line items format
    const lineItems = cart.map((product: CartProduct) => {
      if (!product.name || !product.quantity || !product.price) {
        throw new Error("Invalid product data in the cart.");
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.imageUrl ? [product.imageUrl] : [], // Optional image
          },
          unit_amount: product.price * 100, // Amount in cents
        },
        quantity: product.quantity,
      };
    });

    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: email, // Auto-fill the email field on Stripe Checkout
      mode: "payment",
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${process.env.NEXT_PUBLIC_CANCEL_URL || "http://localhost:3000/cancel"}`,
      metadata: {
        username: username,
        email: email,
        cart: JSON.stringify(cart), // Pass cart as a string
      },
    });

    // Return the session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating Stripe session:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
