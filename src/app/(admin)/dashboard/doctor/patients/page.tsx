import ListDisplayCard from "@/components/dashboard/doctor/ListDisplayCard";
import React from "react";
import { getDoctorAppointments } from "../../../../../../actions/appointments";
import { PatientProps } from "@/components/dashboard/doctor/PatientPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import { getDoctorBySlug } from "../../../../../../actions/users";
import createSlug from "../../../../../../utils/slugFunction";

export default async function AppointmentPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const slug = createSlug(user?.name ?? "");

  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
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
    <div>
      <div className="col-span-3 py-3">
        <ListDisplayCard
          newAppointmentLink={`/doctor/${slug}`}
          count={(patients.length || 0).toString()}
          title="Patients"
        />
      </div>
    </div>
  );
}
