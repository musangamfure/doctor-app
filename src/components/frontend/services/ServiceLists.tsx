import React from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "@prisma/client";
import { ServicesWithDoctorCount } from "../../../../actions/services";

export default function ServiceLists({
  data,
}: {
  data: ServicesWithDoctorCount[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {data.map((service, i) => (
        <ServiceCard key={i} service={service} />
      ))}
    </div>
  );
}
