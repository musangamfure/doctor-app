import { DoctorAvailabilityProps } from "../types/types";

export function getDayFromDate(dateString: string) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of day names, starting from Sunday to Saturday
  const daysOfWeek: (keyof DoctorAvailabilityProps)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  if (dateString) {
    const dayIndex: number = date.getDay();
    return daysOfWeek[dayIndex];
  }

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];

  return dayName;
}
