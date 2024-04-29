import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { products, mode } = await req.json();

  const domainURL = req.headers.get("origin");

  const items = products.map((product: any) => {
    return {
      price: product.id,
      quantity: product.quantity,
    };
  });

  try {

    if (mode === "embedded") {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: items,
        ui_mode:'embedded',
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        return_url: `${domainURL}/embedded-checkout/success?session_id={CHECKOUT_SESSION_ID}`, 
      });

      return NextResponse.json({ clientSecret: session.client_secret }, { status: 200 });
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: items,
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/stripe-hosted/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/stripe-hosted/canceled`,
        // automatic_tax: {enabled: true},
      });

      return NextResponse.json({ redirect_url: session.url }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
};
