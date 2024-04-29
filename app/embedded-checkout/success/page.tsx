"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [session, setSession] = useState<any>();
  const searchParams = useSearchParams();
  const id = searchParams.get("session_id");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session-status?session_id=${id}`);
        const data = await res.json();

        setSession(data.session);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSession();
  }, [id]);

  return (
    session?.status === "complete" && (
      <div className="flex flex-col items-center justify-center bg-gray-100">
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
            Payment Successful!
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
      </div>
    )
  );
};

export default page;
