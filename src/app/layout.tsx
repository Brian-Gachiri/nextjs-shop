import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unleash the Future of Tech with Us",
  description: "Discover the latest in electronics, from smartphones to drones, and beyond. Your one-stop-shop for cutting-edge gadgets, designed to enhance your life and keep you ahead of the curve.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      {children}
      </body>
    </html>
  );
}
