"use client";

import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Clock, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const AvailabilitySettings = ({ slots }) => {
  const [showForm, setShowForm] = useState(false);
  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createLocalDateFromTime = (timeStr) => {
    const [hourMin, modifier] = timeStr.split(/ /);
    let [hours, minutes] = hourMin.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  const onSubmit = async () => {
    if (loading) return;

    if (!startTime || !endTime) {
      toast.error("Start and End time are required");
      return;
    }

    const start = createLocalDateFromTime(startTime);
    const end = createLocalDateFromTime(endTime);

    if (start >= end) {
      toast.error("End time must be after start time");
      return;
    }

    const formData = new FormData();
    formData.append("startTime", start.toISOString());
    formData.append("endTime", end.toISOString());

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data?.success) {
      setShowForm(false);
      toast.success("Availability updated successfully");
    }
  }, [data]);

  const formatTimeString = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "Invalid time";
    }
  };

  return (
    <Card className="border-emerald-900/20">
      <CardHeader className="bg-emerald-950/10 p-4 rounded-t-xl border-b border-emerald-900/20 shadow-sm">
        <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-emerald-400" />
          Availability Settings
        </CardTitle>
        <CardDescription className="mt-1 text-emerald-200">
          Set your daily availability for patient appointments
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                Current Availability
              </h3>

              {slots.length === 0 ? (
                <p className="text-sm text-emerald-200 bg-emerald-950/10 p-3 rounded-md border border-emerald-800/20 shadow-sm">
                  You haven&apos;t added any availability yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {slots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 rounded-lg bg-emerald-950/10 border border-emerald-800/20 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-800/30 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium tracking-wide">
                            {formatTimeString(slot.startTime)} - {formatTimeString(slot.endTime)}
                          </p>
                          <p className={`text-xs font-medium ${slot.appointment ? "text-red-400" : "text-emerald-300"}`}>
                            {slot.appointment ? "Booked" : "Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium py-2 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center rounded-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Availability Time
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-emerald-800/20 bg-emerald-950/10 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-emerald-100 mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-400" />
              Configure Your Daily Availability
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-emerald-200">Start Time</Label>
                <TimePicker
                  onChange={setStartTime}
                  value={startTime}
                  format="h:mm a"
                  disableClock
                  clearIcon={null}
                  className="text-white bg-emerald-900/10 border border-emerald-800/30 rounded-md p-2 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-emerald-200">End Time</Label>
                <TimePicker
                  onChange={setEndTime}
                  value={endTime}
                  format="h:mm a"
                  disableClock
                  clearIcon={null}
                  className="text-white bg-emerald-900/10 border border-emerald-800/30 rounded-md p-2 w-full"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="border-emerald-700 text-emerald-200 hover:bg-emerald-800/10"
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilitySettings;
