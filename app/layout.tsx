import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stripe Checkout ",
  description: "stripe checkout demo by nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <title>Stripe Payment Demo</title>
      </head> */}
      <body className={inter.className}>
        <div className="h-screen w-screen flex justify-center items-center bg-slate-600">
          {children}
        </div>
      </body>
    </html>
  );
}
