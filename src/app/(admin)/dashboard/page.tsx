import Dashboard from "@/components/dashboard/Dashboard";
import PatientDashboard from "@/components/dashboard/patient/PatientDashboard";
import DoctorDashboard from "@/components/doctor/DoctorDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.role === "DOCTOR") {
    return (
      <div>
        <DoctorDashboard />
      </div>
    );
  }
  if (user?.role === "USER") {
    return (
      <div>
        <PatientDashboard />
      </div>
    );
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}
