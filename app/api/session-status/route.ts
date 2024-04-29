import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session_id = await req.nextUrl.searchParams.get("session_id");
    console.log(session_id);
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id!);
    return NextResponse.json(
      {
        session: session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
