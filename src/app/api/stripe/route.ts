import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json(); // Get the cart data from the request body


    // Map cart items to Stripe line items format
    const lineItems = cart.map((product: CartProduct) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: product.price * 100, // Amount in cents
      },
      quantity: product.quantity,
    }));

    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000//success",
      cancel_url: "http://localhost:3000/cancel",
    });


    // Return the session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}