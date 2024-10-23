import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import React, { ReactNode } from "react";
import { getAppointments } from "../../../../../../actions/appointments";
import { Calendar } from "lucide-react";
import ListPanel from "@/components/dashboard/doctor/ListPanel";
import NewButton from "@/components/dashboard/doctor/NewButton";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const appointments = (await getAppointments()).data || [];
  return (
    <>
      <div>
        <div className="flex justify-between items-center border-b p-3">
          <PannelHeader
            title="Appointment"
            className="border-b-0 py-0"
            icon={Calendar}
            count={(appointments.length || 0).toString().padStart(2, "0")}
          />
          <NewButton
            title="New Appointment"
            href="/dashboard/doctor/appointments/new"
          />
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2 py-3  border-r">
            <ListPanel appointments={appointments} />
          </div>
          <div className="col-span-3 py-3">{children}</div>
        </div>
      </div>
    </>
  );
}
