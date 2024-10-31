import React from "react";
import DoctorList from "@/components/frontend/DoctorList";
import Container from "@/components/frontend/Container";
import { getDoctorsWithProfiles } from "../../../../../../../actions/users";
import { Doctor } from "../../../../../../../types/types";

export default async function DoctorsForAppointment({
  title = "Telehealth Visit",
  isInPersonal = false,
  doctors,
}: {
  title?: string;
  isInPersonal?: boolean;
  doctors: Doctor[];
}) {
  const doctorsResult = (await getDoctorsWithProfiles()) || [];

  // Filter Telehealth doctors
  const telehealthDoctors = doctorsResult.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth"
  ) as Doctor[];
  const inPersonDoctors = doctorsResult.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor Visit"
  ) as Doctor[];
  return (
    <div>
      <Container className="bg-blue-100 py-2 lg:p-6 dark:bg-neutral-900">
        <DoctorList
          title="Telehealth Visit"
          isInPersonal={false}
          doctors={telehealthDoctors}
        />
      </Container>
      <Container className="p-2 lg:4 dark:bg-slate-950">
        <DoctorList
          title="In-Person Doctors Visit"
          isInPersonal={true}
          doctors={inPersonDoctors}
        />
      </Container>
    </div>
  );
}
