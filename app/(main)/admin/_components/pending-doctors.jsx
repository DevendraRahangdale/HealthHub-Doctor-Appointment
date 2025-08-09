"use client";

import { updateDoctorStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Check, ExternalLink, FileText, Medal, User, X } from "lucide-react";
import { BarLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PendingDoctors = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctors] = useState(null);
  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorStatus);

  const handleUpdateStatus=async(doctorId,status)=>{
    if(loading) return;
     const formData=new FormData();
     formData.append("doctorId",doctorId);
     formData.append("status",status);

     await submitStatusUpdate(formData);
  };
  useEffect(()=>{
if(data && data?.success){
  handleCloseDialog();
}
  },[data]);




  const handleViewDetails = (doctor) => {
    setSelectedDoctors(doctor);
  };

  const handleCloseDialog = () => {
    setSelectedDoctors(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-gradient-to-br from-[#0c1413] to-[#0d2c2c] border border-emerald-900/20 shadow-[0_2px_6px_rgba(0,255,210,0.1)] hover:shadow-[0_4px_10px_rgba(0,255,210,0.2)] rounded-2xl transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-white">
            Pending Doctor Verifications
          </CardTitle>
          <CardDescription className="text-teal-300">
            Review and approve doctor applications submitted for verification.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-lg">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-5">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-[#0f1f1f] border border-emerald-900/20 rounded-xl transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,255,210,0.15)]"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Doctor Info */}
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-900/30 rounded-full p-2">
                          <User className="h-5 w-5 text-emerald-300" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-base">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-teal-300">
                            {doctor.specialty} • {doctor.experience} years
                            experience
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="bg-amber-900/20 border-amber-900/30 text-amber-400"
                        >
                          Pending
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(doctor)}
                          className="border-emerald-900/30 text-emerald-300 hover:bg-emerald-900/20 transition"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Doctor Verification Details
              </DialogTitle>
              <DialogDescription>
                Review the doctor's information carefully before making a
                decision
              </DialogDescription>
            </DialogHeader>

            {/* You can insert the doctor's detailed info here */}
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-[#0c1413] to-[#0d2c2c] p-6 rounded-xl shadow-[0_4px_12px_rgba(0,255,210,0.1)] border border-emerald-800/20 transition-all hover:shadow-[0_6px_18px_rgba(0,255,210,0.15)]">
                {/* Full Name */}
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-teal-400 tracking-wide">
                    Full Name
                  </h4>
                  <p className="text-base font-medium text-white">
                    {selectedDoctor.name}
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-teal-400 tracking-wide">
                    Email
                  </h4>
                  <p className="text-base font-medium text-white break-all">
                    {selectedDoctor.email}
                  </p>
                </div>

                {/* Application Date */}
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-teal-400 tracking-wide">
                    Application Date
                  </h4>
                  <p className="text-base font-medium text-white">
                    {format(new Date(selectedDoctor.createdAt), "PPP")}
                  </p>
                </div>
              </div>

              <Separator className="bg-emerald-900/20" />

              {/* Professional Details */}
              <div className="space-y-5 rounded-xl p-4 border border-emerald-900/30 bg-[#0c1413] shadow-[0_4px_12px_rgba(0,255,210,0.07)] hover:shadow-[0_6px_20px_rgba(0,255,210,0.15)] transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Medal className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white tracking-wide">
                    Professional Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                  {/* Specialty */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-teal-300">
                      Specialty
                    </h4>
                    <p className="text-base text-white font-medium">
                      {selectedDoctor.specialty}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-teal-300">
                      Years of Experience
                    </h4>
                    <p className="text-base text-white font-medium">
                      {selectedDoctor.experience} years
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="space-y-1 col-span-2">
                    <h4 className="text-sm font-medium text-teal-300">
                      Credentials
                    </h4>
                    <div className="flex items-center">
                      <a
                        href={selectedDoctor.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-medium underline-offset-2 hover:underline flex items-center transition-all"
                      >
                        View Credentials
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-emerald-900/20" />

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-white font-medium">
                    Service Description
                  </h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {selectedDoctor.description}
                </p>
              </div>
            </div>

            {loading && <BarLoader width={"100%"} color="#36d7b7" />}

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-4">
              <Button
                variant="destructive"
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "REJECTED")
                }
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-[0_4px_12px_rgba(255,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,0,0,0.25)] transition-all duration-200"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "VERIFIED")
                }
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-[0_4px_12px_rgba(0,255,210,0.15)] hover:shadow-[0_6px_20px_rgba(0,255,210,0.2)] transition-all duration-200"
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PendingDoctors;
