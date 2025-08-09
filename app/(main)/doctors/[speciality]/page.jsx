import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import { DoctorCard } from "@/components/doctor-card";
import PageHeader from "@/components/page-header";
import { redirect } from "next/navigation";
import React from "react";

const SpecialityPage = async ({ params }) => {
  const { speciality } = await params;

  if (!speciality) {
    redirect("/doctors");
  }
  const { doctors, error } = await getDoctorsBySpecialty(speciality);

  if (error) {
    console.error("Failed to fetch doctors:", error);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          <span className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600 text-transparent bg-clip-text tracking-tight drop-shadow-sm">
            {speciality.split("%20").join(" ")}
          </span>
        }
        backLink="/doctors"
        backLabel=" Browse All Specialties"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl border border-emerald-900/20 bg-muted/10 shadow-[0_4px_20px_rgba(0,255,210,0.05)]">
          <h3 className="text-2xl font-semibold text-white mb-2">
            No doctors available
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We couldn't find any verified doctors in this specialty right now.
            Please check back soon or explore other specialties.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpecialityPage;
