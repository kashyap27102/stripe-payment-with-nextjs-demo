import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { products } = await req.json();

  const domainURL = req.headers.get("origin");

  // A list of items the customer is purchasing. Use this parameter to pass one-time or recurring
  const items = products.map((product: any) => {
    return {
      price: product.id, 
      quantity: product.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      ui_mode: "embedded",
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      return_url: `${domainURL}/embedded-checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
};
