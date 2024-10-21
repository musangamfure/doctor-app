import Link from "next/link";
import React, { useState } from "react";
import { Doctor } from "../../../types/types";
import { Button } from "../ui/button";
import { getDayName } from "../../../utils/getDayName";

const AvailabileTime = ({ doctor }: { doctor: Doctor }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const today = getDayName();

  const timeStamps = doctor.doctorProfile?.availability?.[today] ?? [];
  return (
    <>
      {timeStamps && timeStamps.length > 0 && (
        <div className="w-full mt-3 grid grid-cols-2 gap-2">
          {timeStamps.map((time, index) => (
            <Button
              variant={"outline"}
              onClick={() => setSelectedTime(time)}
              key={index}
              className={
                selectedTime === time
                  ? "bg-purple-600 text-white rounded-md text-center uppercase px-3 py-1"
                  : "bg-white text-slate-950 rounded-md border border-slate-200 text-center uppercase px-3 py-1"
              }
            >
              {time}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default AvailabileTime;
