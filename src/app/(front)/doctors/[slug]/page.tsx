import BookingCard from "@/components/frontend/BookingCard";
import DoctorDetails from "@/components/frontend/DoctorDetails";
import Container from "@/components/frontend/Container";
import Image from "next/image";
import React from "react";
import { getDoctorBySlug } from "../../../../../actions/users";

export default async function DoctorsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const doctor = await getDoctorBySlug(slug);
  console.log(doctor);
  return (
    <>
      {doctor && doctor.id ? (
        <div>
          <Container className="bg-slate-50 py-10 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto shadow-md  dark:border dark:border-white/15 px-4 rounded-lg bg-white dark:bg-slate-950 ">
              <div className="py-6 px-8">
                <div className="py-6 px-8 flex items-center justify-between">
                  <div className="">
                    <div className="mb-4">
                      <h1 className="text-xl font-bold uppercase">
                        <span className="mr-1">Dr.</span> {doctor.name}
                      </h1>
                      <p className="text-gray-600 text-sx">Adult Health</p>
                    </div>
                    <p className="font-extrabold">
                      {doctor.doctorProfile?.operationMode}
                    </p>
                    <p className="mt-3">
                      3250 Lincoln Highway, Kendall Park, NJ 08824
                    </p>
                  </div>
                  <div className="">
                    <Image
                      src={
                        doctor.doctorProfile?.profilePicture ?? "/doctor.jpg"
                      }
                      alt="doctor"
                      className="w-36 h-36 rounded-full object-cover  "
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
                <DoctorDetails doctor={doctor} />
              </div>
            </div>
            {/* <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg dark:bg-neutral-950 ">
              <div className="max-w-4xl mx-auto ">
                <BookingCard
                  doctor={doctor}
                  price={145}
                  discountedPrice={132}
                  appointmentTime="Wed, Sep 4 - 10:30 AM"
                  timeZone="EDT"
                  buttonText="Book"
                  note="You won't be charged yet"
                />
              </div>
            </div> */}
          </Container>
        </div>
      ) : (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn&apos;t find doctor&apos; details page you&apos;re
              looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="/" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
