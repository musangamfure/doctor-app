import {
  CalendarCheck,
  CheckCircle,
  CircleDotDashed,
  History,
  Mail,
  MapPin,
  User,
  UserRound,
  X,
} from "lucide-react";
import React from "react";
import { getPatientAppointments } from "../../../../../../../../actions/appointments";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { timeAgo } from "../../../../../../../../utils/timeAgo";

export default async function AppointmentDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointmentData = await getPatientAppointments(id);
  const appointments = appointmentData.data;

  if (!appointments) {
    return <div>Appointment not found</div>;
  }

  return (
    <div className="p-4">
      <div className="border-b pb-2 flex gap-2 items-center">
        <h2 className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0">
          Appointments
        </h2>
        <span className="w-8 h-8 text-green-600 rounded-full  border border-gray-200 flex items-center justify-center dark:text-white shadow-sm">
          {appointments.length.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 px-4 py-2">
        {appointments.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/dashboard/doctor/appointments/view/${item.id}`}
              className={cn(
                "border w-full mb-2 shadow-sm text-sm inline-block py-2 px-4 rounded-md  border-gray-200 bg-white/95 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              )}
            >
              <div className="flex justify-between items-center pb-3">
                <h3>
                  {item.firstName} {item.lastName}
                </h3>
                <div className="flex items-center ">
                  <History className="h-4 w-4 mr-1 " />
                  <span className="text-sm">{timeAgo(item.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2 gap-4">
                <div className="flex items-center font-semibold">
                  <CalendarCheck className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">
                    {" "}
                    {item.appointmentFormattedDate}
                  </span>
                </div>
                <span className="font-semibold">{item.appointmentTime} </span>
              </div>
              <div className="flex items-center py-2">
                {item.status === "approved" ? (
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                ) : item.status === "pending" ? (
                  <CircleDotDashed className="h-4 w-4 mr-1 text-yellow-500" />
                ) : (
                  <X className="h-4 w-4 mr-1 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-medium capitalize",
                    item.status === "approved"
                      ? "text-green-500 font-semibold"
                      : item.status === "pending"
                      ? "text-yellow-500 font-semibold"
                      : "text-red-500 font-semibold"
                  )}
                >
                  {item.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
