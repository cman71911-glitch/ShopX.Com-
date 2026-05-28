/**
 * Formats a given number into Indian Rupees (INR) format.
 * E.g. 24990 becomes ₹24,990
 */
export function formatCurrency(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculates delivery estimate offset based on a pin code or city name.
 * Provides a dynamic, trustworthy estimate.
 */
export function getDeliveryEstimate(deliveryAddress: string): string {
  const lowercase = deliveryAddress.toLowerCase();
  if (lowercase.includes("mumbai") || lowercase.includes("4000")) {
    return "Tomorrow, by 10 PM";
  }
  if (lowercase.includes("delhi") || lowercase.includes("1100") || lowercase.includes("noida") || lowercase.includes("gurgaon")) {
    return "Today, by 9 PM (Super Fast)";
  }
  if (lowercase.includes("bangalore") || lowercase.includes("bengaluru") || lowercase.includes("5600")) {
    return "Tomorrow morning, by 11 AM";
  }
  if (lowercase.includes("chennai") || lowercase.includes("6000")) {
    return "In 2 days, by 4 PM";
  }
  if (lowercase.includes("kolkata") || lowercase.includes("7000")) {
    return "In 2 days, by 8 PM";
  }
  if (lowercase.includes("hyderabad") || lowercase.includes("5000")) {
    return "Tomorrow, by 2 PM";
  }
  // Generic fallback delivery
  return "Within 3-4 Days (Standard Delivery)";
}
