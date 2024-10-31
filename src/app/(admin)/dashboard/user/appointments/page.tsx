import ListDisplayCard from "@/components/dashboard/doctor/ListDisplayCard";
import React from "react";
import { getPatientAppointments } from "../../../../../../actions/appointments";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";

export default async function AppointmentPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }
  const appointments = (await getPatientAppointments(user?.id)).data || [];
  return (
    <div>
      <div className="col-span-3 py-3">
        <ListDisplayCard
          newAppointmentLink={"/dashboard/user/appointments/new"}
          count={(appointments.length || 0).toString()}
        />
      </div>
    </div>
  );
}
