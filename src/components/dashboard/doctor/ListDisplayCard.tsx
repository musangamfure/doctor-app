import { Calendar } from "lucide-react";
import React from "react";
import NewButton from "./NewButton";

export default function ListDisplayCard({
  count,
  newAppointmentLink,
  title,
}: {
  count: string;
  newAppointmentLink: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-[300px] bg-white dark:bg-black">
      <div className="pb-3">
        <Calendar className="w-8 h-8 flex-shrink-0 text-gray-500" />
      </div>
      <p>
        You have{" "}
        <span className="text-blue-500 font-semibold">
          {" "}
          {count.padStart(2, "0")} {title}{" "}
        </span>{" "}
        today.
      </p>

      <NewButton
        title={`New ${title}`}
        href={newAppointmentLink}
        className="mt-4"
      />
    </div>
  );
}
