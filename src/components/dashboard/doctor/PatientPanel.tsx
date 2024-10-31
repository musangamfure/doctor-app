"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Mail, MapPin, User, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";

export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
  occupation: string;
  age: string;
}

export default function PatientPanel({
  patients,
  role,
}: {
  patients: PatientProps[];
  role: UserRole;
}) {
  const pathname = usePathname();
  return (
    <ScrollArea className={cn("h-[25rem] w-full px-3")}>
      {patients.map((patient) => (
        <Link
          key={patient.patientId}
          href={`/dashboard/${
            role === "USER" ? "user" : "doctor"
          }/patients/view/${patient.patientId}`}
          className={cn(
            "border w-full mb-2 shadow-sm text-sm inline-block py-2 px-4 rounded-md",
            pathname === `/dashboard/doctor/patients/view/${patient.patientId}`
              ? "border-gray-200 bg-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              : "border-gray-200 bg-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
          )}
        >
          <div className="flex justify-between items-center pb-3">
            <h3>{patient.name}</h3>
            <div className="flex items-center ">
              <MapPin className="h-4 w-4 mr-1 " />
              <span className="text-sm">{patient.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-b-gray-200 pb-2 gap-4">
            <div className="flex items-center font-semibold">
              <Mail className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm"> {patient.email}</span>
            </div>
            <span className="font-semibold">{patient.phone} </span>
          </div>
          <div className="flex items-center py-2">
            {patient.gender === "male" ? (
              <User className="h-4 w-4 mr-1 text-blue-500" />
            ) : (
              <UserRound className="h-4 w-4 mr-1 text-pink-500" />
            )}
            <span
              className={cn(
                "text-medium capitalize",
                patient.gender === "male"
                  ? "text-blue-500 font-semibold"
                  : "text-pink-500 font-semibold"
              )}
            >
              {patient.gender}
            </span>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
