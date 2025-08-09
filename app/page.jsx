

import Pricing from "@/components/pricing";
import SubscribeForm from "@/components/SubscribeForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { ArrowRight, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">

     <section className="relative overflow-hidden py-24">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">

      {/* Left Section – Text */}
      <div className="max-w-xl space-y-6 animate-fade-in-up ml-10">
        <Badge
          variant="outline"
          className="bg-emerald-800/20 border-emerald-600/30 px-4 py-2 text-teal-300 text-sm font-semibold"
        >
          Trusted Digital Healthcare
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Your Health, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300">
            Our Priority
          </span>
        </h1>

        <p className="text-lg md:text-xl text-emerald-100 max-w-md">
          Skip the waiting room. Instantly connect with certified doctors, manage appointments, and access your medical history — all from the comfort of your home.
        </p>

        <ul className="text-emerald-100 text-md space-y-2 list-disc pl-5">
          <li>Consult top doctors via secure video calls</li>
          <li>Access prescriptions and health records anytime</li>
          <li>AI-powered health reminders and alerts</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link href="/onboarding">
              Start Your Care <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-teal-300 hover:bg-white/10 text-white transition-all duration-300"
          >
            <Link href="/doctors">Browse Specialists</Link>
          </Button>

 {/* New Symptom Checker Button */}
  <Button
    asChild
    variant="secondary"
    size="lg"
    className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
  >
    <Link href="/symptom-checker">
      AI Symptom Checker
    </Link>
  </Button>


          



        </div>
      </div>

      {/* Right Section – Image */}
      <div className="relative w-full max-w-md lg:max-w-lg h-[400px] lg:h-[440px] rounded-2xl overflow-hidden shadow-xl  transition-all duration-500 hover:scale-105 hover:shadow-2xl mr-20">
        <Image
          src="/image.png"
          alt="Doctor consultation"
          fill
          priority
          className=" rounded-2xl "
        />
      </div>
    </div>
  </div>
</section>


{/* testimonial section */}

<section className="py-24 bg-gradient-to-b from-[#0f172a]/60 to-[#1e293b]/60">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Your Smart Health Journey
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        A simple, secure, and smarter way to get medical care from anywhere.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="border border-emerald-800/30 hover:border-emerald-400/50 hover:shadow-xl shadow-md transition-all duration-300 hover:scale-[1.03] rounded-2xl p-4 group"
        >
          <CardHeader className="pb-2">
            <div className="p-3 rounded-full w-fit mb-4 bg-opacity-20 group-hover:rotate-6 transition-transform duration-500"
                 style={{ backgroundColor: index % 2 === 0 ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)' }}>
              {feature.icon}
            </div>
            <CardTitle className="text-xl font-semibold text-white group-hover:text-emerald-300">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


{/* price section */}


 {/* Pricing Section with green medical styling */}
     <section id="pricing" className="py-24">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <Badge
        variant="outline"
        className="bg-teal-800/20 border-teal-600/30 px-4 py-1 text-teal-300 text-sm font-medium mb-4"
      >
        Easy & Affordable
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Simple Credit-Based Packages
      </h2>
      <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
        No complex pricing — just credits that you can use when you need care. It’s healthcare that adapts to your lifestyle.
      </p>
    </div>

    <div className="mx-auto">
      {/* Pricing Table can go here */}

      <Pricing/>




      <Card className="mt-12 border border-teal-500/20 hover:border-teal-400/40 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-teal-400" />
            How Our Credit System Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {creditBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 bg-teal-800/20 p-1.5 rounded-full">
                  <svg
                    className="h-4 w-4 text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <p
                  className="text-teal-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: benefit }}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>






  {/* Testimonials with green medical accents */}
      <section className="py-24 bg-gradient-to-b from-[#0f172a]/60 to-[#1e293b]/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-teal-800/20 border-teal-600/30 px-4 py-1 text-teal-300 text-sm font-medium mb-4"
            >
              Voices of Trust
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Stories from Our Users
            </h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Discover how people across India are transforming their healthcare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-teal-800/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-xl"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-teal-900/30 flex items-center justify-center mr-4">
                      <span className="text-teal-300 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-teal-100 italic leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-[#171e1e] text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Our team of experienced professionals is here to support your health journey.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { name: "Dr. Riya Mehta", title: "Gynecologist" },
        { name: "Dr. Ankur Joshi", title: "Cardiologist" },
        { name: "Dr. Sneha Iyer", title: "Dentist" },
        { name: "Dr. Ramesh B.", title: "General Physician" }
      ].map((doc, i) => (
        <div key={i} className="bg-[#19363a]/50 p-6 rounded-xl text-center shadow hover:shadow-md hover:scale-105 transition">
          <div className="w-16 h-16 mx-auto bg-teal-800/30 rounded-full flex items-center justify-center text-teal-300 font-bold mb-4">
            {doc.name.split(' ').map(w => w[0]).join('')}
          </div>
          <h4 className="font-semibold text-lg">{doc.name}</h4>
          <p className="text-sm text-gray-400">{doc.title}</p>
        </div>
      ))}
    </div>
  </div>
</section>




<section className="py-20 bg-[#0f172a] text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Got questions? We have got answers to common queries about our platform.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          q: "How do I book a consultation?",
          a: "Sign up, complete your profile, and choose a doctor from the specialists list to book an appointment."
        },
        {
          q: "Are all doctors verified?",
          a: "Yes, every healthcare professional on our platform is certified and verified by our internal team."
        },
        {
          q: "Can I cancel or reschedule?",
          a: "Absolutely. You can cancel or reschedule any consultation up to 2 hours before the appointment."
        },
        {
          q: "What if I miss my video call?",
          a: "You can reschedule via the dashboard, or contact support for quick assistance."
        }
      ].map((item, idx) => (
        <div key={idx} className="bg-[#19363a]/50 p-6 rounded-xl shadow-lg hover:shadow-teal-500/30 transition">
          <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
          <p className="text-gray-300">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
</section>



   {/* --- Separate Health Tips Section --- */}
<section className="py-20 bg-[#061616] text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Healthy Living Tips
      </h2>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Actionable advice from our doctors and wellness experts, refreshed every month.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "5 Foods That Boost Immunity", date: "June 2025", slug: "boost-immunity" },
        { title: "How to Sleep Better Naturally", date: "May 2025", slug: "sleep-better" },
        { title: "Digital Detox: A Weekend Guide", date: "April 2025", slug: "digital-detox" }
      ].map((tip, idx) => (
        <div
          key={idx}
          className="bg-[#19363a]/70 border border-teal-800 p-6 rounded-xl shadow-md hover:shadow-teal-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          <p className="text-sm text-teal-400 mb-2 font-medium">{tip.date}</p>
          <h3 className="font-semibold text-xl mb-2 text-white">{tip.title}</h3>
          <p className="text-gray-300">
            Explore practical steps and small habits that can make a big difference to your well-Sbeing.
          </p>
          <Link
            href={`/blogs/${tip.slug}`}
            className="inline-block mt-4 text-teal-300 font-semibold hover:underline"
          >
            Read more →
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>











                 {/* CTA Section with upgraded styling and newsletter */}
      <section className="py-24 bg-gradient-to-br from-[#0d1320] via-[#131617] to-[#091b1b]">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-tr from-[#182d32]/80 to-[#19363a]/70 border border-[#2a4f4d]/40 shadow-2xl rounded-2xl">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-snug">
                  Step Into Smarter Healthcare
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Thousands have already simplified their health journey with us. Stay connected, stay healthy — anytime, anywhere.
                </p>
                <ul className="text-teal-300 text-md space-y-2 mb-8">
                  <li>✓ No long queues or travel</li>
                  <li>✓ Trusted and certified doctors</li>
                  <li>✓ Your records, always with you</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-400 text-black font-semibold shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/sign-up">Get Started Today</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-teal-500 text-teal-300 hover:bg-teal-900/30 hover:text-white transition-colors duration-300"
                  >
                    <Link href="#pricing">Explore Pricing</Link>
                  </Button>
                </div>
               <SubscribeForm/>
              </div>

              {/* Decorative healthcare-themed background glow */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-teal-300/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
              <div className="absolute left-0 bottom-0 w-[250px] h-[250px] bg-teal-200/10 rounded-full blur-3xl -ml-20 -mb-10 animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </section>
















    </div>
  );
}
