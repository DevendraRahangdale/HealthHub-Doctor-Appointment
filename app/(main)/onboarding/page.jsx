"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SPECIALTIES } from "@/lib/specialities";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Custom hook for user role server action

const doctorFormSchema = z.object({
  specialty: z.string().min(1, "specialty is required"),
  experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(70, "Experience must be less than 70 year"),
  credentialUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Credential URL is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
});
const onboardingPage = () => {

  const [step, setStep] = useState("choose-role");

  const router= useRouter()

  const {data,fn:submitUserRole,loading}=useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },

    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialityValue = watch("specialty");

  const handlePatientSelection=async()=>{
    if(loading) return ;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      toast.success("Role Selected");
      router.push(data.redirect);
    }
  }, [data]);

  const onDoctorSubmit=async(data)=>{
if(loading) return ;
const formData=new FormData();
 formData.append("role","DOCTOR");
 formData.append("specialty",data.specialty);
 formData.append("experience",data.experience.toString());
 formData.append("credentialUrl",data.credentialUrl);
 formData.append("description",data.description);


 

 await submitUserRole(formData);


  }











  if (step === "choose-role") {
    return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
    {/* Patient Card */}
    <Card
      className="bg-gradient-to-br from-[#0c1413] to-[#0d2c2c] rounded-2xl shadow-[0_10px_40px_rgba(0,255,210,0.15)] transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_60px_rgba(0,255,210,0.2)] hover:scale-[1.01] cursor-pointer border border-transparent hover:border-teal-400/40"
      onClick={() => !loading && handlePatientSelection()}
    >
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="p-4 bg-teal-900/30 rounded-full mb-4">
          <User className="h-8 w-8 text-teal-300" />
        </div>
        <CardTitle className="text-2xl font-bold text-white mb-2">
          I'm a Patient
        </CardTitle>
        <CardDescription className="text-gray-300 mb-4">
          Find trusted doctors, book appointments, and get expert care — anytime, anywhere.
        </CardDescription>
        <Button
          className="w-full mt-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue as Patient"
          )}
        </Button>
      </CardContent>
    </Card>

    {/* Doctor Card */}
    <Card
      className="bg-gradient-to-br from-[#0c1413] to-[#0d2c2c] rounded-2xl shadow-[0_10px_40px_rgba(0,255,210,0.15)] transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_60px_rgba(0,255,210,0.2)] hover:scale-[1.01] cursor-pointer border border-transparent hover:border-teal-400/40"
      onClick={() => !loading && setStep("doctor-form")}
    >
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="p-4 bg-teal-900/30 rounded-full mb-4">
          <Stethoscope className="h-8 w-8 text-teal-300" />
        </div>
        <CardTitle className="text-2xl font-bold text-white mb-2">
          I'm a Doctor
        </CardTitle>
        <CardDescription className="text-gray-300 mb-4">
          Set up your HealthHub profile, manage availability, and offer consultations globally.
        </CardDescription>
        <Button
          className="w-full mt-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all"
          disabled={loading}
        >
          Continue as Doctor
        </Button>
      </CardContent>
    </Card>
  </div>
);

  }


  if (step === "doctor-form") {
      return (
  <Card className="bg-gradient-to-br from-[#0c1413] to-[#0d2c2c] rounded-2xl shadow-[0_10px_40px_rgba(0,255,210,0.1)] border border-teal-700/30">
    <CardContent className="p-10">
      <div className="mb-8 text-center">
        <CardTitle className="text-3xl font-extrabold text-white mb-2">
          Doctor Profile Setup
        </CardTitle>
        <CardDescription className="text-teal-300 text-md">
          Provide your credentials and specialty to begin offering your services.
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onDoctorSubmit)} className="space-y-6">
        {/* Speciality */}
        <div className="space-y-2">
          <Label htmlFor="specialty" className="text-white font-semibold">
            Medical Speciality
          </Label>
          <Select
            value={specialityValue}
            onValueChange={(value) => setValue("specialty", value)}
          >
            <SelectTrigger
              id="specialty"
              className="bg-[#0f1f1f] text-white border border-teal-800 focus:ring-2 focus:ring-teal-500"
            >
              <SelectValue placeholder="Select your speciality" />
            </SelectTrigger>
            <SelectContent className="bg-[#102e2e] text-white border border-teal-700">
              {SPECIALTIES.map((spec) => (
                <SelectItem
                  key={spec.name}
                  value={spec.name}
                  className="flex items-center gap-2 hover:bg-teal-900/40 transition-all"
                >
                  <span className="text-emerald-400">{spec.icon}</span>
                  {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.specialty && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {errors.specialty.message}
            </p>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-white font-semibold">
            Years of Experience
          </Label>
          <Input
            id="experience"
            type="number"
            placeholder="e.g. 5"
            className="bg-[#0f1f1f] text-white border border-teal-800 focus:ring-2 focus:ring-teal-500"
            {...register("experience", { valueAsNumber: true })}
          />
          {errors.experience && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Credential URL */}
        <div className="space-y-2">
          <Label htmlFor="credentialUrl" className="text-white font-semibold">
            Credential Document URL
          </Label>
          <Input
            id="credentialUrl"
            type="url"
            placeholder="https://example.com/my-medical-degree.pdf"
            className="bg-[#0f1f1f] text-white border border-teal-800 focus:ring-2 focus:ring-teal-500"
            {...register("credentialUrl")}
          />
          <p className="text-sm text-gray-400">
            Provide a direct link to your degree/certification.
          </p>
          {errors.credentialUrl && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {errors.credentialUrl.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white font-semibold">
            About Your Services
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your expertise, experience, and what makes your care special."
            rows={4}
            className="bg-[#0f1f1f] text-white border border-teal-800 focus:ring-2 focus:ring-teal-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep("choose-role")}
            className="border border-teal-700 text-teal-300 hover:bg-teal-900/30"
            disabled={loading}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit for Verification"
            )}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
);
  }
};

export default onboardingPage;
