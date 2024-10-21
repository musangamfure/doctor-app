import ServiceForm from "@/components/dashboard/ServiceForm";
import React from "react";
import { getServicebySlug } from "../../../../../../../actions/services";

export default async function UpdateServicePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const service = (await getServicebySlug(slug))?.data;
  return (
    <div>
      {service && service.slug && (
        <ServiceForm title="Update Service" initialData={service} />
      )}
    </div>
  );
}
