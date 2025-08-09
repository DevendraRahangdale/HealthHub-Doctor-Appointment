import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import {
  
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HealthHub-Doctors Appointment App",
  description: "Connect with doctors anytime ,anywhere",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider 
   appearance={{
        baseTheme:dark,
      }}>

      <html lang="en" suppressHydrationWarning >
        <body
          className={`${inter.className}`}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* {header} */}
            <Header />






            <main className="min-h-screen">{children} </main>
            <Toaster richColors/>

            {/* footer */}

            <footer className="bg-slate-900 py-5 text-center border-t border-slate-700">
              <div className="text-md text-slate-200 font-medium">
                Bringing care closer to you with
                <span className="text-red-500 text-lg">❤️</span> by
                <span className="text-sky-400 font-bold"> Devendra</span> — Powered by
                <span className="text-emerald-400 font-bold"> HealthHub</span>
              </div>
              <div className="text-sm text-slate-400 mt-2">
                &copy; 2025 HealthHub. Your health, our priority.
              </div>
            </footer>





          </ThemeProvider>










        </body>
      </html>
    </ClerkProvider>

  );
}
