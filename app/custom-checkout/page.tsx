"use client";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutItems } from "@/components/checkout-items";
import getStripe from "@/util/get-stripejs";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";

const page = () => {
  const checkoutItems = JSON.parse(localStorage.getItem("checkout-items")!);
  return (
    <div className="grid grid-cols-2 bg-slate-300 p-8 rounded-lg h-fit">
      <CheckoutItems checkoutItems={checkoutItems} />
      <CheckoutForm />
    </div>
  );
};

export default page;
