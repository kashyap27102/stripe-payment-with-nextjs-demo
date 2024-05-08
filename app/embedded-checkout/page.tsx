"use client";
import getStripe from "@/util/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = getStripe();

const Page = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const client_Secret = window?.localStorage.getItem("client_secret")!;
    setClientSecret(client_Secret);
  }, []);

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

export default Page;
