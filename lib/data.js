// icons
import {
  CalendarClock,
  VideoIcon,
  WalletCards,
  HeartPulse,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

// Updated and unique features for your project
export const features = [
  {
    icon: <HeartPulse className="h-6 w-6 text-teal-400" />,
    title: "Complete Health Profile",
    description:
      "Get started by setting up your medical profile for more accurate suggestions and care.",
  },
  {
    icon: <CalendarClock className="h-6 w-6 text-teal-400" />,
    title: "Schedule Consultations",
    description:
      "Check doctor availability and lock in appointments that work with your routine.",
  },
  {
    icon: <VideoIcon className="h-6 w-6 text-teal-400" />,
    title: "Live Video Sessions",
    description:
      "Talk to verified specialists over private, secure, HD video consultations.",
  },
  {
    icon: <WalletCards className="h-6 w-6 text-teal-400" />,
    title: "Flexible Credit Packs",
    description:
      "Pay as you go or subscribe to monthly credit plans that best suit your health needs.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-teal-400" />,
    title: "Licensed Professionals",
    description:
      "Only registered and approved doctors are onboarded to ensure medical safety.",
  },
  {
    icon: <FileCheck2 className="h-6 w-6 text-teal-400" />,
    title: "Secure Health Records",
    description:
      "View and manage prescriptions, notes, and visit summaries in one place.",
  },
];

// Updated testimonials
export const testimonials = [
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Software Engineer",
    quote:
      "Consulting doctors during my work-from-home routine has never been easier. The video call quality is top-notch!",
  },
  {
    initials: "AM",
    name: "Dr. Arjun Mehta",
    role: "Pediatrician",
    quote:
      "This platform lets me stay connected with families and provide timely care without clinic overheads.",
  },
  {
    initials: "VK",
    name: "Vikram Khanna",
    role: "Small Business Owner",
    quote:
      "With healthcare credits, I saved both time and money. It’s perfect for managing my family's health on the go.",
  },
];


// Unique credit system benefits
export const creditBenefits = [
  "Each session costs <strong class='text-teal-400'>2 credits</strong>, no hidden fees involved",
  "Your credits <strong class='text-teal-400'>never expire</strong> and remain available anytime",
  "Subscribers receive <strong class='text-teal-400'>bonus credits monthly</strong> with extra perks",
  "Switch or cancel your plan <strong class='text-teal-400'>whenever you like</strong> without charges",
];
