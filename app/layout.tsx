import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Iosevka_Charon } from "next/font/google";
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

const isoveka = Iosevka_Charon({
  subsets: ["latin"],
  variable: "--font-isoveka",
  weight: ['400', '700']
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
    <html lang="en" className={`${display.variable} ${sans.variable} ${isoveka.variable}`}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <div className="h-8" />
        {children}
      </body>
    </html>
  );
}
