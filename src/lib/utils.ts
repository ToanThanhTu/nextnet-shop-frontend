import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const dateToFormat = new Date(date);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false, // 24-hour format
  }).format(dateToFormat);

  return formattedDate;
}
