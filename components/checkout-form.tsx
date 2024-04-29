"use client";
import getStripe from "@/util/get-stripejs";
import {
  AddressElement,
  Elements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import { productData } from "@/data/products";
import { AddressForm } from "@/components/address-form";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onConfirmHandler = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/custom-checkout/success",
      },
    });
    console.log(error);
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.type);
    } else {
      setMessage("An unexpexted error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={onConfirmHandler}
      className="flex  w-[600px] flex-col gap-4"
    >
      {/* <ExpressCheckoutElement
        onConfirm={() => {}}
        options={{
          wallets: { applePay: "always" },
          buttonTheme: { applePay: "black" },
        }}
      /> */}
      <LinkAuthenticationElement />
      <PaymentElement
        options={{
          layout: "accordion",
          business: { name: "Simform Solutions" },
        }}
      />
      <AddressElement options={{ mode: "billing" }} />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 p-2 rounded-md text-white text-pretty"
      >
        {isLoading ? "Loading" : "Pay Now"}
      </button>
      {message && (
        <div className="bg-red-200  text-red-800 px-4 py-2 rounded-sm">
          {message}
        </div>
      )}
    </form>
  );
};
