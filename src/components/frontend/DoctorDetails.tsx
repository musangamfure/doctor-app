"use client";

import React, { useState } from "react";
import ServiceDetailsComponent from "./ServiceDetailsComponent";
import Availability from "../availability";
import { Doctor } from "../../../types/types";
import { Appointment } from "@prisma/client";

export default function DoctorDetails({
  doctor,
  appointment,
}: {
  doctor: Doctor;
  appointment: Appointment | null;
}) {
  const [active, setActive] = useState("availability");

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
    <div className="pb-10 dark:bg-slate-950">
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

      <div className="pt-8">
        {active === "availability" ? (
          <div className="">
            <Availability doctor={doctor} appointment={appointment} />
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
