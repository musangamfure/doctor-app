import ListDisplayCard from "@/components/dashboard/doctor/ListDisplayCard";
import React from "react";
import { getAppointments } from "../../../../../../actions/appointments";
import NewButton from "@/components/dashboard/doctor/NewButton";

export default async function AppointmentPage() {
  const appointments = (await getAppointments()).data || [];
  return (
    <div>
      <div className="col-span-3 py-3">
        <ListDisplayCard count={(appointments.length || 0).toString()} />
      </div>
    </div>
  );
}
