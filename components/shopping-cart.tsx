"use client";
import { productData } from "@/data/products";
import { calculateTotalAmount } from "@/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const ShoppingCart = () => {
  const [products, setProducts] = useState(productData);
  const router = useRouter();

  // Function to Update Quantity of the product
  const updateQuantity = (id: string, type: "increment" | "decrement"): any => {
    if (type === "increment") {
      //   setQuantity((prev) => prev + 1);
      setProducts((products) =>
        products.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }

    if (type === "decrement") {
      setProducts((products) =>
        products.map((p) =>
          p.id === id && p.quantity !== 1
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
      );
    }
  };

  // Handler to checkout using stripe-hosted page
  const checkoutHandler = async () => {
    try {
      const res = await fetch("/api/create-hosted-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: products }),
      });
      const data = await res.json();
      router.push(data.redirect_url);
    } catch (error) {
      console.log(error);
    }
  };

  // Handler to checkout using embedded way
  const embeddedCheckoutHandler = async () => {
    try {
      const res = await fetch("/api/create-embedded-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: products, mode: "embedded" }),
      });
      const data = await res.json();
      localStorage.setItem("client_secret", data.clientSecret);
      router.push("/embedded-checkout");
    } catch (error) {
      console.log(error);
    }
  };

  // Handler to checkout custome flow
  const customeCheckoutHandler = async () => {
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: products }),
      });
      const data = await res.json();

      // store the checkedout products and client-secret for custom-checkout page
  
      localStorage.setItem("client-secret", data.clientSecret);
      localStorage.setItem(
        "checkout-items",
        JSON.stringify({
          products: products,
          totalAmount: calculateTotalAmount(products),
        })
      );
      router.push("/custom-checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-10 w-[800px] ">
      <h1 className="text-4xl text-white font-light"> Shopping Cart</h1>
      <div className="space-y-4">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="grid grid-cols-6 items-center justify-center bg-slate-300 p-6 rounded-md"
            >
              <Image
                src={product.imageUrl}
                alt="product-image"
                className="col-span-1 rounded-full shadow-xl"
                width={50}
                height={50}
              />
              <p className="col-span-3">{product.title}</p>
              <p className="col-span-1">$ {product.price}</p>
              <div className="cols-span-1 flex gap-4">
                <button
                  className="p-1 bg-orange-500 rounded-sm text-white h-5 w-5 flex items-center justify-center"
                  onClick={() => updateQuantity(product.id, "increment")}
                >
                  +
                </button>
                <input
                  type="text"
                  min={1}
                  value={product.quantity}
                  className="w-5 text-center bg-none"
                  readOnly
                />
                <button
                  className="p-1  bg-orange-500 rounded-sm text-white h-5 w-5 flex items-center justify-center"
                  onClick={() => updateQuantity(product.id, "decrement")}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-white">
        <p>Total Amount : $ {calculateTotalAmount(products)}</p>
        <div className="space-x-4">
          <button
            className="bg-orange-500 hover:bg-orange-600 rounded-sm py-2 px-3 col-span-1"
            onClick={checkoutHandler}
          >
            Stripe Hosted Checkout
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 rounded-sm py-2 px-3 col-span-1"
            onClick={embeddedCheckoutHandler}
          >
            Embedded
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 rounded-sm py-2 px-3 col-span-1"
            onClick={customeCheckoutHandler}
          >
            Custom Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
