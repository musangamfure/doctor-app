import Link from "next/link";
import React from "react";

import DoctorCard from "@/components/frontend/DoctorCard";
import {
  getDoctorBySpecialitySlug,
  SpecialityDataProps,
} from "../../../../../actions/doctors";
import { Doctor } from "../../../../../types/types";
import { getDayName } from "../../../../../utils/getDayName";

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = params;
  const title = slug.replace("-", " ");
  const data = (await getDoctorBySpecialitySlug(slug)) as SpecialityDataProps;
  const doctors = data.doctors;
  const specialities = data.specialities;

  const doctorsWithTimestamps = doctors?.filter((doctor: Doctor) => {
    const today = getDayName();
    const timeStamps = doctor.doctorProfile?.availability?.[today] ?? [];
    return timeStamps.length > 0;
  });

  return (
    <div className="container p-8">
      <h1 className="capitalize scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl py-4">
        {title} ({doctorsWithTimestamps?.length.toString().padStart(2, "0")})
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-3  border border-gray-200/50 rounded-ms p-6">
          <h2 className="capitalize font-semibold  ">Other Specialties</h2>
          <div className="py-3 flex flex-col gap-2 text-sm">
            {specialities &&
              specialities.length > 0 &&
              specialities.map((speciality, i) => {
                return (
                  <Link
                    key={i}
                    href={`/speciality/${speciality.slug}`}
                    className="hover:text-blue-600"
                  >
                    {speciality.title}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="col-span-9">
          {doctorsWithTimestamps && doctorsWithTimestamps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {doctorsWithTimestamps.map((doctor: Doctor) => {
                return (
                  <DoctorCard
                    key={doctor.id}
                    rating={5.0}
                    reviewsCount={4}
                    specialization="Family medicine"
                    availability="Available tomorrow"
                    review="Great customer service! Love the doctors and the entire staff."
                    prices={{ original: 131, discounted: 121 }}
                    doctor={doctor}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">
                No doctors found in this specialty
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
