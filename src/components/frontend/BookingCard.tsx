import React from "react";

interface BookingCardProps {
  price: number;
  discountedPrice?: number;
  appointmentTime: string;
  timeZone: string;
  buttonText: string;
  note: string;
}

const BookingCard = ({
  price,
  discountedPrice,
  appointmentTime,
  timeZone,
  buttonText,
  note,
}: BookingCardProps) => {
  return (
    <div className="flex justify-between dark:bg-neutral-950 items-center p-4 w-full">
      <div>
        <p className="text-2xl font-bold text-purple-600">${price}</p>
        {discountedPrice && (
          <p className="text-sm text-purple-600">
            Or ${discountedPrice} with Sesame Plus
          </p>
        )}
        <p className="mt-2 text-sm font-bold text-black dark:text-white/95">
          {appointmentTime} {timeZone}
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
