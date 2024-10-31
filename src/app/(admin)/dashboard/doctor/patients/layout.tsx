import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import React, { ReactNode } from "react";
import {
  getAppointments,
  getDoctorAppointments,
} from "../../../../../../actions/appointments";
import { Calendar } from "lucide-react";
import ListPanel from "@/components/dashboard/doctor/ListPanel";
import NewButton from "@/components/dashboard/doctor/NewButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import PatientPanel, {
  PatientProps,
} from "@/components/dashboard/doctor/PatientPanel";
import createSlug from "../../../../../../utils/slugFunction";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
  const slug = createSlug(user?.name ?? "");
  const appointments = (await getDoctorAppointments(user.id)).data || [];

  const patients = Array.from(
    new Map(
      appointments.map((app) => [
        app.patientId, // Using patientId as the unique key
        {
          patientId: app.patientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          gender: app.gender,
          location: app.location,
          occupation: app.occupation,
          age: app.dob ? app.dob.toISOString() : null,
        },
      ])
    ).values()
  ) as PatientProps[];

  return (
    <>
      <div>
        <div className="flex justify-between items-center border-b p-3">
          <PannelHeader
            title="Patients"
            className="border-b-0 py-0"
            icon={Calendar}
            count={(patients.length || 0).toString().padStart(2, "0")}
          />
          <NewButton title="New Patient" href={`/doctor/${slug}`} />
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2 py-3  border-r">
            <PatientPanel patients={patients} role={user.role} />
          </div>
          <div className="col-span-3 py-3">{children}</div>
        </div>
      </div>
    </>
  );
}
