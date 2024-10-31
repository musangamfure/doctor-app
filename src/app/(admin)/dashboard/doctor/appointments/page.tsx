import ListDisplayCard from "@/components/dashboard/doctor/ListDisplayCard";
import React from "react";
import { getAppointments } from "../../../../../../actions/appointments";

export default async function AppointmentPage() {
  const appointments = (await getAppointments()).data || [];
  return (
    <div>
      <div className="col-span-3 py-3">
        <ListDisplayCard
          title="Appointments"
          newAppointmentLink={"/dashboard/doctor/appointments/new"}
          count={(appointments.length || 0).toString()}
        />
      </div>
    </div>
  );
}
