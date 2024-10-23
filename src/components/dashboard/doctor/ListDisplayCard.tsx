import { Calendar } from "lucide-react";
import React from "react";
import NewButton from "./NewButton";

export default function ListDisplayCard({ count }: { count: string }) {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-[300px] bg-white dark:bg-black">
      <div className="pb-3">
        <Calendar className="w-8 h-8 flex-shrink-0 text-gray-500" />
      </div>
      <p>You have {count.padStart(2, "0")} appointments today.</p>
      <p> 11 New Patients, 3 Follow Ups, 4 Annual Physicals</p>
      <NewButton
        title="New Appointment"
        href="/dashboard/doctor/appointments/new"
        className="mt-4"
      />
    </div>
  );
}
