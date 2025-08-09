import { getCurrentUser } from '@/actions/onboarding'
import { getPatientAppointments } from '@/actions/patient';
import AppointmentCard from '@/components/appointment-card';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/dist/server/api-utils';
import React from 'react'

const PatientAppointmentsPage =async () => {

    const user=await getCurrentUser();

    if(!user || user.role !=="PATIENT"){
        redirect("/onboarding");
    }

const {appointments,error}=await getPatientAppointments();

  return (
    <div className='container mx-auto px-4 py-8'>
  <PageHeader
    icon={<Calendar />}
    title="My Appointments"
    backLink='/doctors'
    backLabel='Find Doctors'
  />

  <Card className="border border-emerald-800/40 shadow-lg backdrop-blur-sm bg-emerald-950/10 rounded-xl transition-all duration-300">
    <CardHeader className="border-b border-emerald-800/20">
      <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-400" />
        Your Scheduled Appointments
      </CardTitle>
    </CardHeader>

    <CardContent className="py-6 px-4 sm:px-6">
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-400 text-lg font-medium">Error: {error}</p>
        </div>
      ) : appointments?.length > 0 ? (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              userRole="PATIENT"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-14 w-14 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            No appointments scheduled
          </h3>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            You don&apos;t have any appointments scheduled yet. Browse our doctors and book your first consultation.
          </p>
        </div>
      )}
    </CardContent>
  </Card>
</div>

  )
}

export default PatientAppointmentsPage
