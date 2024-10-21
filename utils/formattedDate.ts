export function formatTodayDate() {
  const today = new Date(); // Get today's date
  const formattedDate = today.toString().split(" ").slice(0, 3).join(" ");
  const GMT = today.toString().split(" ").slice(5, 6).join(" ");

  return `${formattedDate} - ${GMT}`;
}
