import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";

export function formatBookingDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export function formatBookingTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatStringToDate(date: string) {
  if (!date) return null;
  return parseDate(date);
}

export function formatDateToString(date: DateValue | null | undefined): string {
  if (!date) return "";
  return date.toString();
}
