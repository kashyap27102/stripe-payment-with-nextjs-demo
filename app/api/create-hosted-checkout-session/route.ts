import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { products } = await req.json();

  const domainURL = req.headers.get("origin");

  // A list of items the customer is purchasing. Use this parameter to pass one-time or recurring
  const items = products.map((product: any) => {
    return {
      price: product.id, // ex. price_1P8b4lSDd04VsX80J0LFjjL9 (you will get from stripe)
      quantity: product.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/stripe-hosted/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/stripe-hosted/canceled`,
    });

    return NextResponse.json({ redirect_url: session.url }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
};
