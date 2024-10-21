import React from "react";
import SpecialtyForm from "@/components/dashboard/SpeciltyForm";
import { getSymptombySlug } from "../../../../../../../actions/symptoms";
import SymptomForm from "@/components/dashboard/SymptomForm";

export default async function UpdateSymptomPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const symptom = (await getSymptombySlug(slug))?.data;
  return (
    <div>
      {symptom && symptom.id && (
        <SymptomForm title="Update Symptom" initialData={symptom} />
      )}
    </div>
  );
}
