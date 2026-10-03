import { Metadata } from "next";
import TipsView from "@/components/TipsView";
import { getAllTips } from "@/lib/tips";

export const metadata: Metadata = {
  title: "Tips - CashNode",
  description: "Practical tips on personal finance and payments.",
};

export default function TipsPage() {
  const tips = getAllTips();
  return (
    <main className="mx-auto max-w-2xl px-6 pb-28 text-lg">
      <TipsView tips={tips} />
    </main>
  );
}
