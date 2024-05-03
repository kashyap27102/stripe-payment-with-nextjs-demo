"use client";
import { useStripe } from "@stripe/react-stripe-js";
import { Metadata } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const metaData: Metadata = {
  title:'Payment Success',
  description:"Payment Success page"
};

const page = () => {
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  
  const client_secret = searchParams.get("payment_intent_client_secret");
  
  useEffect(() => {
    if (!stripe || !client_secret) return;
  
    stripe.retrievePaymentIntent(client_secret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {message && (
        <div className="max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-slate-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            {message}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>
          <Link
            href="/"
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
