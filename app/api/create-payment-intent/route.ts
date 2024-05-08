import { calculateTotalAmount } from "@/util";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { products } = await req.json();

  const calculateOrderAmount = (items: any) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(products),
      currency: "usd",
      description: "Product purchase service",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
