import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, HelpCircle } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Pricing from "@/components/pricing";

export default async function PricingPage() {
  return (
    <section className="bg-[#0c1111] text-white min-h-screen py-20 px-4">
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-teal-400 border border-teal-700 px-4 py-2 rounded-lg hover:bg-teal-800/30 hover:text-white transition-all text-sm font-medium shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back Home
        </Link>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Badge
          variant="outline"
          className="bg-teal-900/20 border-teal-700/30 text-teal-300 px-4 py-1 text-sm mb-4"
        >
          HealthHub Pricing
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
          Smarter Pricing for Smarter Healthcare
        </h1>

        <p className="text-gray-300 text-lg">
          At <span className="text-teal-300 font-semibold">HealthHub</span>,
          our mission is to make healthcare simple and affordable. No hidden
          charges, no long waits—just peace of mind.
        </p>
      </div>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto">
        <Pricing />
      </div>

      {/* Help Section */}
      <div className="max-w-3xl mx-auto text-center mt-24">
        <div className="inline-flex items-center justify-center gap-2 mb-2 text-teal-400">
          <HelpCircle className="h-5 w-5" />
          Need Assistance?
        </div>
        <h2 className="text-2xl font-bold mb-2">We're Here to Help</h2>
        <p className="text-gray-400">
          For any questions regarding pricing, credits, or subscriptions, feel free to reach out at{" "}
          <a href="mailto:support@healthhub.com" className="underline text-teal-300">
            support@healthhub.com
          </a>
        </p>
      </div>
    </section>
  );
}
