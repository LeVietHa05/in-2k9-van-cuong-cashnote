import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
});
const sans = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CashNode",
  description: "A metro map of financial knowledge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <div className="h-8" />
        {children}
      </body>
    </html>
  );
}
