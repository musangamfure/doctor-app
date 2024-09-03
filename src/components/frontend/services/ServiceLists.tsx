import React from "react";
import ServiceCard from "./ServiceCard";
import { ServicesProps } from "../../../../types/types";

export default function ServiceLists({ data }: { data: ServicesProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {data.map((service, i) => (
        <ServiceCard key={i} service={service} />
      ))}
    </div>
  );
}
