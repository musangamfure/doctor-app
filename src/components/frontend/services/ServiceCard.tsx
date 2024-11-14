import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ServicesWithDoctorCount } from "../../../../actions/services";

export default function ServiceCard({
  service,
}: {
  service: ServicesWithDoctorCount;
}) {
  return (
    <Link
      href={`/service/${service.slug}`}
      className="rounded-md bg-slate-100  hover:bg-slate-200 dark:bg-neutral-800 duration-300 flex items-center gap-3 overflow-hidden px-2 "
    >
      <Image
        src={service.imageUrl}
        alt={service.title}
        width={1170}
        height={848}
        className="w-14 h-14 object-contain aspect-video"
      />
      <div className="flex flex-col  py-4">
        <h2>{service.title}</h2>
        <p className="text-[0.7rem]">
          ({service._count.doctorProfiles}) Doctors available
        </p>
      </div>
    </Link>
  );
}
