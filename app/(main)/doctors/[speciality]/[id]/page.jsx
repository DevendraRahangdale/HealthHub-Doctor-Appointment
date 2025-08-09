import { getAvailableTimeSlots, getDoctorById } from "@/actions/appointments";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import Doctorprofile from "./_components/doctor-profile";

const DoctorProfilePage = async ({ params }) => {
  const { id } = await params;
  try {
    const [doctorData, slotsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id),
    ]);
    return (
      <Doctorprofile
        doctor={doctorData.doctor}
        availableDays={slotsData.days || []}
      />
    );
  } catch (error) {
    console.error("Error loading doctor profile:", error);
    redirect("/doctors");
  }
};

export default DoctorProfilePage;
