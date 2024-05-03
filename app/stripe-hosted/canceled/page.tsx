import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Payment Cancelled",
  description: "Payment Cancelled page",
};

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500 mx-auto mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Your payment has been cancelled. If you have any questions, please
          contact support.
        </p>
        <a
          href="/"
          className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg inline-block"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default page;
