"use client";
import getStripe from "@/util/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import React from "react";

const stripePromise = getStripe();

const page = () => {
  const clientSecret = localStorage.getItem("client_secret")!;

  return (
    <div className="p-8 bg-slate-300 flex rounded-md w-[1200px]">
      <div className="flex-1">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default page;
