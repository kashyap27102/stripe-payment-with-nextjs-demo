"use client";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutItems } from "@/components/checkout-items";
import { createPaymentIntent } from "@/data/payment";
import getStripe from "@/util/get-stripejs";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = getStripe();

const CustomCheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState();
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    setCheckoutItems(
      JSON.parse(window && localStorage.getItem("checkout-items")!)
    );
  }, []);

  useEffect(() => {
    const fetchClientSeceret = async () => {
      const cs = await createPaymentIntent();
      setClientSecret(cs);
    };
    fetchClientSeceret();
  }, []);

  return (
    clientSecret && (
      <div className="grid grid-cols-2 bg-slate-300 p-8 rounded-lg h-fit">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { labels: "floating" } }}
        >
          <CheckoutItems checkoutItems={checkoutItems} />
          <CheckoutForm />
        </Elements>
      </div>
    )
  );
};

export default CustomCheckoutPage;
