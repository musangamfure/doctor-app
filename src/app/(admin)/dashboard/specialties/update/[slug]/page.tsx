import React from "react";
import SpecialtyForm from "@/components/dashboard/SpeciltyForm";
import { getSpecialtybySlug } from "../../../../../../../actions/specialties";

export default async function UpdateSpecialtyPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const specialty = (await getSpecialtybySlug(slug))?.data;
  return (
    <div>
      {specialty && specialty.id && (
        <SpecialtyForm title="Update Specialty" initialData={specialty} />
      )}
    </div>
  );
}
