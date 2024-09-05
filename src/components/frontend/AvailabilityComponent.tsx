import React, { useState } from "react";

interface TimeSlot {
  time: string;
  price: number;
}

interface DayAvailability {
  day: string;
  timeSlots: TimeSlot[];
}

interface AvailabilityComponentProps {
  days: DayAvailability[];
}

const AvailabilityComponent = ({ days }: AvailabilityComponentProps) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDayChange = (index: number) => {
    setSelectedDayIndex(index);
    setSelectedTime(null);
  };

  return (
    <div className="bg-white w-full">
      <div className="flex justify-between text-purple-600 font-semibold mb-4">
        <button
          className="text-2xl"
          onClick={() => handleDayChange(Math.max(0, selectedDayIndex - 1))}
          disabled={selectedDayIndex === 0}
        >
          &lt;
        </button>
        <div className="text-center">
          <span className="text-lg">{days[selectedDayIndex].day}</span>
        </div>
        <button
          className="text-2xl"
          onClick={() =>
            handleDayChange(Math.min(days.length - 1, selectedDayIndex + 1))
          }
          disabled={selectedDayIndex === days.length - 1}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {days[selectedDayIndex].timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedTime(slot.time)}
            className={`py-2 px-4 rounded-full text-sm font-medium ${
              selectedTime === slot.time
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            {slot.time} ${slot.price}
          </button>
        ))}
      </div>

      <div className="text-center mt-4">
        <a href="#" className="text-purple-600 text-sm underline">
          See more times
        </a>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <p className="text-gray-600 text-sm">
          Get $10 off this visit as a Sesame member. Activate today!
        </p>
        <a href="#" className="text-purple-600 text-sm font-semibold">
          Read more
        </a>
      </div>
    </div>
  );
};

export default AvailabilityComponent;
