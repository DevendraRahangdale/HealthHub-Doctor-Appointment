"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Loader2, Clock, ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { bookAppointment } from "@/actions/appointments";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

export function AppointmentForm({ doctorId, slot, onBack, onComplete }) {
  const [description, setDescription] = useState("");

  // Use the useFetch hook to handle loading, data, and error states
  const { loading, data, fn: submitBooking } = useFetch(bookAppointment);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("startTime", slot.startTime);
    formData.append("endTime", slot.endTime);
    formData.append("description", description);

    // Submit booking using the function from useFetch
    await submitBooking(formData);
  };

  // Handle response after booking attempt
  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success("Appointment booked successfully!");
        onComplete();
      }
    }
  }, [data]);

  return (
   <form onSubmit={handleSubmit} className="space-y-6">
  <div className="bg-muted/20 p-4 rounded-lg border border-emerald-900/20 space-y-3 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5 text-emerald-400" />
      <span className="text-white font-medium tracking-wide">
        {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-emerald-400" />
      <span className="text-white font-medium">{slot.formatted}</span>
    </div>
    <div className="flex items-center gap-2">
      <CreditCard className="h-5 w-5 text-emerald-400" />
      <span className="text-muted-foreground">
        Cost: <span className="text-white font-semibold">2 credits</span>
      </span>
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="description" className="text-white">
      Describe your medical concern <span className="text-muted-foreground">(optional)</span>
    </Label>
    <Textarea
      id="description"
      placeholder="Briefly describe your concern or what you'd like to discuss..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="bg-background border border-emerald-900/20 h-32 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-300 placeholder:text-muted-foreground"
    />
    <p className="text-sm text-muted-foreground">
      This note will help the doctor prepare before your appointment.
    </p>
  </div>

  <div className="flex justify-between items-center pt-2">
    <Button
      type="button"
      variant="outline"
      onClick={onBack}
      disabled={loading}
      className="border-emerald-900/30 hover:border-emerald-600 transition-all"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Change Time Slot
    </Button>

    <Button
      type="submit"
      disabled={loading}
      className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Booking...
        </>
      ) : (
        "Confirm Booking"
      )}
    </Button>
  </div>
</form>

  );
}