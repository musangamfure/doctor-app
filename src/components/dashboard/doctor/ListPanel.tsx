"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  Check,
  CheckCircle,
  CircleDashed,
  CircleDotDashed,
  History,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "../../../../utils/timeAgo";
import { usePathname } from "next/navigation";

export default function ListPanel({
  appointments,
  role,
}: {
  appointments: Appointment[];
  role: UserRole;
}) {
  const isVisited = (appointmentId: string) => {
    if (typeof window !== "undefined") {
      const visitedAppointments = JSON.parse(
        localStorage.getItem("visitedAppointments") || "[]"
      );
      return visitedAppointments.includes(appointmentId);
    }
    return false;
  };

  const pathname = usePathname();
  return (
    <ScrollArea className={cn("h-[25rem] w-full px-3")}>
      {appointments.map((appointment) => (
        <Link
          key={appointment.id}
          href={`/dashboard/${
            role === "USER" ? "user" : "doctor"
          }/appointments/view/${appointment.id}`}
          onClick={() => {
            const visitedAppointments = JSON.parse(
              localStorage.getItem("visitedAppointments") || "[]"
            );
            if (!visitedAppointments.includes(appointment.id)) {
              visitedAppointments.push(appointment.id);
              localStorage.setItem(
                "visitedAppointments",
                JSON.stringify(visitedAppointments)
              );
            }
          }}
          className={cn(
            "border w-full mb-2 shadow-sm text-sm inline-block py-2 px-4 rounded-md",
            pathname === `/dashboard/user/appointments/view/${appointment.id}`
              ? "border-2 border-blue-300 dark:bg-gray-600 dark:border-blue-300"
              : isVisited(appointment.id)
              ? "border-gray-200 bg-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              : "border-gray-200 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
          )}
        >
          <div className="flex justify-between items-center pb-3">
            <h3>
              {appointment.firstName} {appointment.lastName}
            </h3>
            <div className="flex items-center ">
              <History className="h-4 w-4 mr-1 " />
              <span className="text-sm">{timeAgo(appointment.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b pb-2 gap-4">
            <div className="flex items-center font-semibold">
              <CalendarCheck className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm">
                {" "}
                {appointment.appointmentFormattedDate}
              </span>
            </div>
            <span className="font-semibold">
              {appointment.appointmentTime}{" "}
            </span>
          </div>
          <div className="flex items-center py-2">
            {appointment.status === "approved" ? (
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            ) : appointment.status === "pending" ? (
              <CircleDotDashed className="h-4 w-4 mr-1 text-yellow-500" />
            ) : (
              <X className="h-4 w-4 mr-1 text-red-500" />
            )}
            <span
              className={cn(
                "text-medium capitalize",
                appointment.status === "approved"
                  ? "text-green-500 font-semibold"
                  : appointment.status === "pending"
                  ? "text-yellow-500 font-semibold"
                  : "text-red-500 font-semibold"
              )}
            >
              {appointment.status}
            </span>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
