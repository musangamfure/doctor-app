export const getDayName = () => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;
  const today = new Date();
  const dayName = days[today.getDay()];
  return dayName;
};
