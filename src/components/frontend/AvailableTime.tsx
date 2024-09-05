import Link from "next/link";
import React, { useState } from "react";

const AvailabileTime = ({
  appointmentTimes,
}: {
  appointmentTimes: string[];
}) => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {appointmentTimes.map((time, index) => (
        <Link
          href="#"
          key={index}
          className="bg-purple-600 text-white rounded-full text-center uppercase px-3 py-1 hover:bg-purple-700"
        >
          {time}
        </Link>
      ))}
      <Link
        href="/doctors/slug"
        className="bg-purple-200 text-purple-600 flex-shrink-0 rounded-full px-2 py-1 hover:bg-purple-300"
      >
        More times
      </Link>
    </div>
  );
};

export default AvailabileTime;
