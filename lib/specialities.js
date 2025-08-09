import {
  HeartPulse,
  Stethoscope,
  Bone,
  Eye,
  Baby,
  Brain,
  Flower2,
  Target,
  Milestone,
  Microscope,
  Timer,
  Thermometer,
  Activity,
  CircleDot,
} from "lucide-react";

export const SPECIALTIES = [
  {
    name: "General Medicine",
    icon: <Stethoscope className="h-5 w-5 text-teal-400" />,
  },
  {
    name: "Cardiology",
    icon: <HeartPulse className="h-5 w-5 text-red-500" />,
  },
  {
    name: "Dermatology",
    icon: <CircleDot className="h-5 w-5 text-pink-400" />,
  },
  {
    name: "Endocrinology",
    icon: <Timer className="h-5 w-5 text-purple-400" />,
  },
  {
    name: "Gastroenterology",
    icon: <Thermometer className="h-5 w-5 text-orange-400" />,
  },
  {
    name: "Neurology",
    icon: <Brain className="h-5 w-5 text-cyan-400" />,
  },
  {
    name: "Obstetrics & Gynecology",
    icon: <Flower2 className="h-5 w-5 text-pink-500" />,
  },
  {
    name: "Oncology",
    icon: <Target className="h-5 w-5 text-rose-400" />,
  },
  {
    name: "Ophthalmology",
    icon: <Eye className="h-5 w-5 text-blue-400" />,
  },
  {
    name: "Orthopedics",
    icon: <Bone className="h-5 w-5 text-yellow-500" />,
  },
  {
    name: "Pediatrics",
    icon: <Baby className="h-5 w-5 text-sky-400" />,
  },
  {
    name: "Psychiatry",
    icon: <Brain className="h-5 w-5 text-indigo-400" />,
  },
  {
    name: "Pulmonology",
    icon: <Activity className="h-5 w-5 text-green-400" />,
  },
  {
    name: "Radiology",
    icon: <CircleDot className="h-5 w-5 text-slate-300" />,
  },
  {
    name: "Urology",
    icon: <Milestone className="h-5 w-5 text-amber-400" />,
  },
  {
    name: "Other",
    icon: <Microscope className="h-5 w-5 text-gray-400" />,
  },
];
