"use client";
import getStripe from "@/util/get-stripejs";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";

const stripePromise = getStripe();

const layout = ({ children }: { children: React.ReactNode }) => {
  const clientSecret = localStorage.getItem("client-secret")!;

  return (
    // Wrap all the children to use useStripe and useElement
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { labels: "floating" } }}
    >
      {children}
    </Elements>
  );
};

export default layout;
