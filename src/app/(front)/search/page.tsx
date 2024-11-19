import Link from "next/link";
import React from "react";

import DoctorCard from "@/components/frontend/DoctorCard";
import {
  getDoctorsBySearch,
  SearchDataProps,
  ServiceDataProps,
} from "../../../../actions/doctors";
import { Doctor, SpecialtyProps } from "../../../../types/types";
import { getDayName } from "../../../../utils/getDayName";
import LinkCards from "@/components/frontend/doctors/SymptomsLinkCard";
import SpecialtyLinkCards from "@/components/frontend/doctors/LinkCards";
import ServiceLists from "@/components/frontend/services/ServiceLists";
import SymptomsLinkCard from "@/components/frontend/doctors/SymptomsLinkCard";
import {
  getServices,
  ServicesWithDoctorCount,
} from "../../../../actions/services";

export default async function ServicePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query } = searchParams as { query: string };

  const data = (await getDoctorsBySearch(query)) as SearchDataProps;
  const doctors = data?.doctors;
  const specialities = data?.specialties;
  const symptoms = data?.symptoms;
  const SearchServices = data?.services;

  const allServices = (await getServices()) || [];

  const services = SearchServices.length > 0 ? SearchServices : allServices;

  console.log(data);

  const doctorsWithTimestamps = doctors?.filter((doctor: Doctor) => {
    const today = getDayName();
    const timeStamps = doctor.doctorProfile?.availability?.[today] ?? [];
    return timeStamps.length > 0;
  });

  return (
    <div className="container p-8">
      <h1 className="capitalize scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl py-4">
        {query}
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-3  border border-gray-200/50 rounded-ms p-6">
          <h2 className="capitalize font-semibold  ">Browse By Services</h2>
          <div className="py-3 flex flex-col gap-2 text-sm">
            {services &&
              services.length > 0 &&
              services.map((service, i) => {
                return (
                  <Link
                    key={i}
                    href={`/service/${service.slug}`}
                    className="hover:text-blue-600"
                  >
                    {service.title} ({service._count.doctorProfiles})
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="col-span-9">
          {specialities && specialities.length > 0 && (
            <div className="py-6 border-b">
              <h2>
                Result for <span className="font-semibold">{query} </span>in
                Specialties:
              </h2>
              <SpecialtyLinkCards specialties={specialities} />
            </div>
          )}
          {SearchServices && SearchServices.length > 0 && (
            <div className="py-6 border-b w-full">
              <h2>
                Result for <span className="font-semibold">{query} </span>in
                Services:
              </h2>
              <ServiceLists data={SearchServices} />
            </div>
          )}
          {symptoms && symptoms.length > 0 && (
            <div className="py-6 border-b">
              <h2>
                Result for <span className="font-semibold">{query} </span> in
                Symptoms:
              </h2>
              <SymptomsLinkCard symptoms={symptoms} />
            </div>
          )}
          {doctorsWithTimestamps && doctorsWithTimestamps.length > 0 ? (
            <div className="py-6">
              <h2>
                Result for <span className="font-semibold">{query} </span> in
                Doctors:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 py-6 border-b   gap-4">
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
