export function getLongDate(dateString: string): string {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of day names, starting from Sunday to Saturday
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Array of month names
  const monthsOfYear: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day of the week (0-6), month (0-11), and day of the month (1-31)
  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const month: string = monthsOfYear[date.getMonth()];
  const dayOfMonth: number = date.getDate();

  // Format the string as "Thursday, October 17"
  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}
