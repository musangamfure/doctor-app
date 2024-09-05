"use client";

import React, { useState } from "react";
import AvailabilityComponent from "./AvailabilityComponent";
import ServiceDetailsComponent from "./ServiceDetailsComponent";

export default function DoctorDetails() {
  const [active, setActive] = useState("availability");
  const days = [
    {
      day: "Wed, Sep 4",
      timeSlots: [
        { time: "1:00 PM", price: 145 },
        { time: "1:30 PM", price: 145 },
        { time: "2:00 PM", price: 145 },
        { time: "2:30 PM", price: 145 },
        { time: "3:00 PM", price: 145 },
      ],
    },
    {
      day: "Thu, Sep 5",
      timeSlots: [
        { time: "8:00 AM", price: 145 },
        { time: "8:30 AM", price: 145 },
        { time: "9:00 AM", price: 145 },
        { time: "9:30 AM", price: 145 },
        { time: "10:00 AM", price: 145 },
      ],
    },
    {
      day: "Fri, Sep 6",
      timeSlots: [
        { time: "8:00 AM", price: 145 },
        { time: "8:30 AM", price: 145 },
        { time: "9:00 AM", price: 145 },
        { time: "9:30 AM", price: 145 },
        { time: "10:00 AM", price: 145 },
      ],
    },
  ];

  const included = ["Referral to specialist", "Prescription, if recommended"];
  const excluded = [
    "Worker's comp paperwork",
    "Controlled substance prescription",
    "Immunization(s)",
    "Laboratory tests",
    "Diagnostic tests",
  ];
  const details =
    "In-person visit with a doctor or nurse. Suitable for: cold, flu, sore throat, UTI, or other immediate health concerns.";
  const additionalInfo =
    "Get $10 off this visit as a Sesame member. Activate today!";

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center ">
        <button
          onClick={() => setActive("details")}
          className={
            active === "details"
              ? "bg-blue-600 w-full text-white py-4 px-8"
              : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8 "
          }
        >
          Service Details
        </button>
        <button
          onClick={() => setActive("availability")}
          className={
            active === "availability"
              ? " bg-blue-600 w-full text-white py-4 px-8"
              : "border border-gray-200 bg-slate-100 w-full text-slate-800 py-4 px-8"
          }
        >
          Availabiltity
        </button>
      </div>

      <div className="py-8">
        {active === "availability" ? (
          <div className="">
            <AvailabilityComponent days={days} />
          </div>
        ) : (
          <div className="">
            <ServiceDetailsComponent
              included={included}
              excluded={excluded}
              details={details}
              additionalInfo={additionalInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
