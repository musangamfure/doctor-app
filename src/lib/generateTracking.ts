export function generateTrackingNumber(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let trackingNumber = "";

  for (let i = 0; i < 10; i++) {
    trackingNumber += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return trackingNumber;
}
