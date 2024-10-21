import { Card, CardContent } from "@/components/ui/card";
import { DoctorProfile } from "@prisma/client";
import React from "react";
import UpdateServiceForm from "./UpdateServiceForm";
import { getServices } from "../../../../actions/services";
import { getSpecialties } from "../../../../actions/specialties";
import { getSymptoms } from "../../../../actions/symptoms";

export default async function DoctorServiceSettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  const services = (await getServices()).data;
  const specialties = (await getSpecialties()).data;
  const symptoms = (await getSymptoms()).data;

  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          <UpdateServiceForm
            profile={profile}
            services={services}
            symptoms={symptoms}
            specialties={specialties}
          />
        </CardContent>
      </Card>
    </>
  );
}
