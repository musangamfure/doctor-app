import DoctorList from "@/components/frontend/DoctorList";
import Container from "@/components/frontend/Container";
import { getDoctorsWithProfiles } from "../../../../../../../actions/users";
import { Doctor } from "../../../../../../../types/types";

export default async function Home() {
  const doctorsResult = (await getDoctorsWithProfiles()) || [];

  // Filter Telehealth doctors
  const telehealthDoctors = doctorsResult.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth"
  ) as Doctor[];
  const inPersonDoctors = doctorsResult.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor Visit"
  ) as Doctor[];

  // console.log(telehealthDoctors);
  console.log(inPersonDoctors);

  return (
    <section className="">
      <Container className="bg-blue-100 p-8 lg:p-24 dark:bg-neutral-900">
        <DoctorList
          title="Telehealth Visit"
          isInPersonal={false}
          doctors={telehealthDoctors}
        />
      </Container>
      <Container className="p-8 lg:p-24 dark:bg-slate-950">
        <DoctorList
          title="In-Person Doctors Visit"
          isInPersonal={true}
          doctors={inPersonDoctors}
        />
      </Container>
    </section>
  );
}
