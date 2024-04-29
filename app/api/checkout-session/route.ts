import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sessionId = new URL(req.nextUrl).searchParams.get("session_id");
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return NextResponse.json({ session: session }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
};
