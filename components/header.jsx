import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import { Calendar, CreditCard, ShieldCheck, Stethoscope, User } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";

const Header = async () => {
  const user = await checkUser();

  if(user?.role==="PATIENT"){
    await checkAndAllocateCredits(user);
  }
  

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div>
            <Image
              src="/logo1.png"
              alt="HealthHub logo"
              width={150}
              height={100}
              className="rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <SignedIn>
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <div className="hidden md:inline-flex">
                  <Button
                    variant="outline"
                    className="items-center gap-2 px-5 py-2 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-600 transition-all shadow hover:shadow-lg font-medium rounded-lg"
                  >
                    <User className="h-4 w-4" />
                    Finish Setup
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-700/50 transition-all rounded-full shadow-sm"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </Link>
            )}
          </SignedIn>

          <SignedIn>
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <div className="hidden md:inline-flex">
                  <Button
                    variant="outline"
                    className="items-center gap-2 px-5 py-2 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-600 transition-all shadow hover:shadow-lg font-medium rounded-lg"
                  >
                    <Calendar className="h-4 w-4" />
                    My Appointments
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-700/50 transition-all rounded-full shadow-sm"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </Link>
            )}
          </SignedIn>

          <SignedIn>
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <div className="hidden md:inline-flex">
                  <Button
                    variant="outline"
                    className="items-center gap-2 px-5 py-2 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-600 transition-all shadow hover:shadow-lg font-medium rounded-lg"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Doctor Dashboard
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-700/50 transition-all rounded-full shadow-sm"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </Link>
            )}
          </SignedIn>

          <SignedIn>
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <div className="hidden md:inline-flex">
                  <Button
                    variant="outline"
                    className="items-center gap-2 px-5 py-2 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-600 transition-all shadow hover:shadow-lg font-medium rounded-lg"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Dashboard
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 border border-teal-500 text-teal-300 hover:text-white hover:bg-teal-700/50 transition-all rounded-full shadow-sm"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </Link>
            )}
          </SignedIn>




          {(!user || user?.role !== "ADMIN") && (
  <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
    <button
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-600 bg-teal-900/20 text-teal-300 hover:bg-teal-800/40 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium"
    >
      <CreditCard className="h-4 w-4" />
      {user && user.role !== "ADMIN" ? (
        <>
          {user.credits}{" "}
          <span className="hidden md:inline">
            {user?.role === "PATIENT" ? "Credits" : "Earned Credits"}
          </span>
        </>
      ) : (
        <>Pricing</>
      )}
    </button>
  </Link>
)}




          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
