import { getCurrentUser } from '@/actions/onboarding'
import { redirect } from 'next/navigation';
import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle, ClipboardCheck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';





const VerificationPage =async () => {


    const user=await getCurrentUser();
    
    
    if(user?.verificationStatus==="VERIFIED"){
        redirect("/doctor");
    }

    const isRejected=user?.verificationStatus==="REJECTED";

  return (
    <div className="container mx-auto px-4 py-12">
  <div className="max-w-2xl mx-auto">
    <Card
      className={`relative border border-emerald-900/30 
        bg-gradient-to-br from-[#081312] to-[#081b1b] 
        shadow-[0_2px_6px_rgba(0,255,210,0.15),0_4px_12px_rgba(0,255,210,0.08)]


        ring-1 ring-emerald-500/10
        backdrop-blur-md
        transform transition-all duration-500 
        hover:scale-[1.015] hover:shadow-[0_3px_6px_rgba(0,255,210,0.25),0_6px_12px_rgba(0,255,210,0.15)]
 
        rounded-2xl`}
    >
      <CardHeader className="text-center">
        <div
          className={`mx-auto p-5 rounded-full w-fit transition-colors shadow-lg ${
            isRejected
              ? "bg-red-900/20 hover:bg-red-900/30"
              : "bg-yellow-900/20 hover:bg-yellow-900/30"
          }`}
        >
          {isRejected ? (
            <XCircle className="h-10 w-10 text-red-400 hover:text-red-300 transition" />
          ) : (
            <ClipboardCheck className="h-10 w-10 text-yellow-400 hover:text-yellow-300 transition" />
          )}
        </div>
        <CardTitle className="text-3xl font-extrabold text-white mt-4 drop-shadow-md">
          {isRejected ? "Verification Declined" : "Verification in Progress"}
        </CardTitle>
        <CardDescription className="text-md text-teal-200 mt-2">
          {isRejected
            ? "We're sorry, your application needs a few updates."
            : "Thanks for submitting your profile for review."}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        {isRejected ? (
          <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-5 mb-6 text-left shadow-inner">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div className="text-red-200 text-sm leading-relaxed">
                <p className="mb-2">
                  Your application needs revision. Common issues:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Missing or unclear credential documents</li>
                  <li>Not enough experience</li>
                  <li>Unclear service description</li>
                </ul>
                <p>Please update your details and try again.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-5 mb-6 text-left shadow-inner">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <p className="text-yellow-200 text-sm leading-relaxed">
                Your profile is being reviewed. This usually takes 1–2 business
                days. You'll receive an email when it's complete.
              </p>
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm mb-6">
          {isRejected
            ? "Revise your profile and resubmit for review."
            : "Feel free to explore or contact support in the meantime."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            className="border-emerald-800 text-emerald-300 hover:bg-emerald-900/20 transition"
          >
            <Link href="/">Return to Home</Link>
          </Button>

          {isRejected ? (
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 text-white shadow-md"
            >
              <Link href="/doctor/update-profile">Update Profile</Link>
            </Button>
          ) : (
            <Button
              asChild
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold shadow-md"
            >
              <Link href="/contact-support">Contact Support</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
</div>

  )
}

export default VerificationPage
