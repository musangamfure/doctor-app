"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

import AvailabileTime from "./frontend/AvailableTime";

export default function Availability({
  appointmentTimes,
}: {
  appointmentTimes: string[];
}) {
  const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date());
  const formatttedDate = bookDate?.toString().split(" ").slice(0, 3).join(" ");
  const GMT = bookDate?.toString().split(" ").slice(5, 6).join(" ");
  const selectedDate = `${formatttedDate}- ${GMT}`;

  return (
    <div>
      <h2 className="font-bold py-4 uppercase text-xl tracking-wider">
        Select a Date and Time
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="sm:col-span-1 col-span-full">
          <Calendar
            mode="single"
            selected={bookDate}
            onSelect={setBookDate}
            className="rounded-md border"
          />
        </div>
        <div className="sm:col-span-1 col-span-full">
          <div className="px-4">
            <h2 className="py-4 text-slate-700 dark:text-white/85 border dark:border-white/15 border-blue-300 text-center  ">
              {selectedDate}
            </h2>
            <AvailabileTime appointmentTimes={appointmentTimes} />
          </div>
        </div>
      </div>
    </div>
  );
}
