import React from "react";
import { Doctor } from "../../../types/types";
import { formatTodayDate } from "../../../utils/formattedDate";

interface BookingCardProps {
  price: number;
  discountedPrice?: number;
  appointmentTime: string;
  timeZone: string;
  buttonText: string;
  note: string;
  doctor: Doctor;
}

const BookingCard = ({
  price,
  discountedPrice,
  appointmentTime,
  timeZone,
  buttonText,
  note,
  doctor,
}: BookingCardProps) => {
  const formattedTodayDate = formatTodayDate();
  return (
    <div className="flex justify-between dark:bg-neutral-950 items-center p-4 w-full">
      <div>
        <p className="text-2xl font-bold text-purple-600">${price}</p>
        {discountedPrice && (
          <p className="text-sm text-purple-600">
            Or ${doctor.doctorProfile?.hourlWage} with Sesame Plus
          </p>
        )}
        <p className="mt-2 text-sm font-bold text-black dark:text-white/95">
          {formattedTodayDate}
        </p>
        <p className="text-sm text-gray-500 dark:text-white/75 mt-1">{note}</p>
      </div>
      <button className="bg-purple-600 text-white rounded-full px-6 py-2 hover:bg-purple-700">
        {buttonText}
      </button>
    </div>
  );
};

export default BookingCard;
