import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const CheckoutForm = () => {
  // The useStripe hook returns a reference to the Stripe instance passed to the Elements provider.
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // get client secret from url
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          router.push("/custom-checkout/success");
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

  // Handler to confirm payment
  const onConfirmHandler = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/custom-checkout`,
      },
    });

    console.log(error);
    setMessage(error.type);
    setIsLoading(false);
  };

  return (
    <form onSubmit={onConfirmHandler} className="flex w-[600px] flex-col gap-4">
      {/* Elements to collect details */}

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
        {isLoading ? "Loading...." : "Pay Now"}
      </button>
      {/* Displaying error message if available */}
      {message && (
        <div className="bg-red-200  text-red-800 px-4 py-2 rounded-sm">
          {message}
        </div>
      )}
    </form>
  );
};
