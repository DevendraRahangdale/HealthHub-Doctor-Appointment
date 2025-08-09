"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import AppointmentCard from "@/components/appointment-card";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = data?.appointments || [];

  return (
    <Card className="border border-emerald-800/25 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 shadow-xl shadow-emerald-800/30 rounded-xl transition-all duration-300">
  <CardHeader className="border-b border-emerald-900/30 pb-4">
    <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2 animate-fade-in">
      <Calendar className="h-6 w-6 text-emerald-400 animate-pulse" />
      <span>Your Scheduled Appointments</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="pt-4">
    {loading ? (
      <div className="text-center py-10 animate-pulse">
        <p className="text-muted-foreground">Fetching your appointments...</p>
      </div>
    ) : appointments.length > 0 ? (
      <div className="space-y-4 animate-fade-in">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="hover:scale-[1.01] hover:shadow-md hover:shadow-emerald-700/40 transition-all duration-300 rounded-lg"
          >
            <AppointmentCard
              appointment={appointment}
              userRole="DOCTOR"
              refetchAppointments={fetchAppointments}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 opacity-85 animate-fade-in">
        <Calendar className="h-14 w-14 mx-auto text-emerald-500 mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          No Appointments Yet
        </h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          It looks like you haven't scheduled any appointments at the moment. Set your availability so patients can start booking consultations.
        </p>
      </div>
    )}
  </CardContent>
</Card>

  );
}