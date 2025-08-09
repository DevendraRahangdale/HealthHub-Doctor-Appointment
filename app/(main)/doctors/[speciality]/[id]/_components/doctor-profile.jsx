"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Medal,
  User,
} from "lucide-react";
import Image from "next/image";

import React, { useState } from "react";
import SlotPicker from "./slot-picker";
import { AppointmentForm } from "./appointment-form";
import { useRouter } from "next/navigation";

const Doctorprofile = ({ doctor, availableDays }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const router = useRouter();

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const totalSlots = availableDays.reduce(
    (total, day) => total + day.slots.length,
    0
  );

  const toggleBooking = () => {
    setShowBooking(!showBooking);

    if (!showBooking) {
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleBookingComplete = () => {
    router.push("/appointments");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Left column - Doctor Photo and Quick Info */}


  <div className="md:col-span-1">
  <div className="md:sticky md:top-24">
    <Card className="border border-emerald-900/30 shadow-md hover:shadow-lg hover:shadow-emerald-700/30 transition-all duration-300 rounded-xl">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-3">

          {/* Doctor Image with glowing border + shadow effect */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-emerald-800/30 group transition-shadow duration-300 shadow-md hover:border-emerald-500 hover:shadow-emerald-500/40">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-900/20">
                <User className="h-16 w-16 text-emerald-400" />
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-2xl font-extrabold text-white mb-1 tracking-wide">
            Dr. {doctor.name}
          </h2>

          {/* Specialty Badge */}
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-emerald-800/30 to-emerald-950/30 border border-emerald-800/30 text-emerald-300 px-3 py-1 rounded-md shadow hover:brightness-110 transition-all text-sm"
          >
            {doctor.specialty}
          </Badge>

          {/* Experience */}
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Medal className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="tracking-wide">{doctor.experience} years of experience</span>
          </div>

          {/* Booking Button */}
          <Button
            onClick={toggleBooking}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 font-medium tracking-wide text-white shadow hover:shadow-emerald-700/30"
          >
            {showBooking ? (
              <>
                Hide Booking
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Book Appointment
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</div>






  {/* Right section */}
  <div className="md:col-span-2 space-y-6">
    <Card className="border border-emerald-900/20 bg-emerald-950/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          About Dr. {doctor.name}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Professional background and expertise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h3 className="text-white font-medium">Description</h3>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {doctor.description}
          </p>
        </div>

        <Separator className="bg-emerald-900/20" />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-400" />
            <h3 className="text-white font-medium">Availability</h3>
          </div>
          {totalSlots > 0 ? (
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
              <p className="text-muted-foreground text-sm">
                {totalSlots} slots available for booking over the next 4 days
              </p>
            </div>
          ) : (
            <Alert className="border-red-500/30 bg-red-900/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                No available slots for the next 4 days. Please check back later.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Booking Section */}
    {showBooking && (
      <div id="booking-section">
        <Card className="border border-emerald-900/20 shadow-lg shadow-emerald-800/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Book an Appointment
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose a time slot and provide consultation details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {totalSlots > 0 ? (
              <>
                {!selectedSlot && (
                  <SlotPicker
                    days={availableDays}
                    onSelectSlot={handleSlotSelect}
                  />
                )}

                {selectedSlot && (
                  <AppointmentForm
                    doctorId={doctor.id}
                    slot={selectedSlot}
                    onBack={() => setSelectedSlot(null)}
                    onComplete={handleBookingComplete}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No available slots
                </h3>
                <p className="text-muted-foreground text-sm">
                  This doctor doesn&apos;t have any available slots right now.
                  Please check back later or try another doctor.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )}
  </div>
</div>

  );
};
export default Doctorprofile;
