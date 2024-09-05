import BookingCard from "@/components/frontend/BookingCard";
import DoctorDetails from "@/components/frontend/DoctorDetails";
import Container from "@/components/frontend/Container";
import Image from "next/image";
import React from "react";

export default function DoctorsPage() {
  return (
    <div>
      <Container className="bg-slate-50 py-10 ">
        <div className="max-w-4xl mx-auto shadow-md  px-4 rounded-lg bg-white ">
          <div className="py-6 px-8">
            <div className="py-6 px-8 flex items-center justify-between">
              <div className="">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Dr. Marie Pabis, MD</h1>
                  <p className="text-gray-600 text-sx">Adult Health</p>
                </div>
                <p className="font-extrabold">In-person doctor visit</p>
                <p className="mt-3">
                  3250 Lincoln Highway, Kendall Park, NJ 08824
                </p>
              </div>
              <div className="">
                <Image
                  src="/doctor.jpg"
                  alt="doctor"
                  className="w-36 h-36 rounded-full object-cover  "
                  width={128}
                  height={128}
                />
              </div>
            </div>
            <DoctorDetails />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg ">
          <div className="max-w-4xl mx-auto ">
            <BookingCard
              price={145}
              discountedPrice={132}
              appointmentTime="Wed, Sep 4 - 10:30 AM"
              timeZone="EDT"
              buttonText="Book"
              note="You won't be charged yet"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
