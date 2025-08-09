"use client";

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
import { updateDoctorActiveStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { Ban, Check, Loader2, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VerifiedDoctors = ({ doctors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [targetDoctor, setTagetDoctor] = useState(null);

  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.email.toLowerCase().includes(query)
    );
  });

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorActiveStatus);


  const handleStatusChange=async(doctor)=>{
    
    const confirmed=window.confirm(
      `Are you sure you want to suspend ${doctor.name}?`
    );

    if(!confirmed || loading) return;


     const formData=new FormData();
     formData.append("doctorId",doctor.id);
     formData.append("status","true");


     setTagetDoctor(doctor);
     await submitStatusUpdate(formData);
  };

  useEffect(()=>{
    if(data?.success && targetDoctor){
      toast.success(`Suspended ${targetDoctor.name}successfully!`);
      setTagetDoctor(null);
    }
  },[data]);







  return (
   <div>
  <Card className="bg-muted/20 border border-emerald-900/20 shadow-[0_2px_6px_rgba(0,255,210,0.05)] hover:shadow-[0_4px_12px_rgba(0,255,210,0.08)] transition-all">
    <CardHeader>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-2xl font-bold text-white">
            Manage Doctors
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            View and manage all verified doctors
          </CardDescription>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors..."
            className="pl-8 bg-background border border-emerald-900/20 text-white focus:border-emerald-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </CardHeader>

    <CardContent>
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground italic">
          {searchTerm
            ? "No doctors match your search criteria."
            : "No verified doctors available."}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => {
            const isSuspended = doctor.verificationStatus === "REJECTED";
            return (
              <Card
                key={doctor.id}
                className="bg-background border border-emerald-900/20 hover:border-emerald-700/30 shadow-[0_2px_6px_rgba(0,255,210,0.06)] hover:shadow-[0_4px_10px_rgba(0,255,210,0.1)] transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted/20 rounded-full p-2 shadow-inner">
                        <User className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-base">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialty} • {doctor.experience} years
                          experience
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {doctor.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {isSuspended ? (
                        <>
                          <Badge
                            variant="outline"
                            className="bg-red-900/20 border-red-900/30 text-red-400"
                          >
                            Suspended
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(doctor, false)}
                            disabled={loading}
                            className="border-emerald-900/30 hover:bg-muted/80 text-emerald-400"
                          >
                            {loading && targetDoctor?.id === doctor.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4 mr-1" />
                            )}
                            Reinstate
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge
                            variant="outline"
                            className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                          >
                            Active
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(doctor, true)}
                            disabled={loading}
                            className="border-red-900/30 hover:bg-red-900/10 text-red-400"
                          >
                            {loading && targetDoctor?.id === doctor.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Ban className="h-4 w-4 mr-1" />
                            )}
                            Suspend
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </CardContent>
  </Card>
</div>

  );
};

export default VerifiedDoctors;
