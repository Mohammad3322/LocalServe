import {
  formatBookingDate,
  formatBookingTime,
  formatDateToString,
  formatStringToDate,
} from "@/lib/utils/formatters";

const normaliseSpaces = (value: string) => value.replace(/\s/g, " ");

describe("formatBookingDate", () => {
  it("formats a YYYY-MM-DD date as a long, human readable date", () => {
    expect(formatBookingDate("2026-09-28")).toBe("Monday, September 28, 2026");
  });

  it("does not shift the day because of a UTC timezone", () => {
    expect(formatBookingDate("2026-01-01")).toContain("January 1, 2026");
    expect(formatBookingDate("2026-12-31")).toContain("December 31, 2026");
  });

  it("returns the original input when the date cannot be parsed", () => {
    expect(formatBookingDate("not-a-date")).toBe("not-a-date");
  });
});

describe("formatBookingTime", () => {
  it("formats a 24 hour HH:mm time as a 12 hour time", () => {
    expect(normaliseSpaces(formatBookingTime("09:00"))).toBe("9:00 AM");
    expect(normaliseSpaces(formatBookingTime("13:45"))).toBe("1:45 PM");
  });

  it("keeps midnight and noon unambiguous", () => {
    expect(normaliseSpaces(formatBookingTime("00:00"))).toBe("12:00 AM");
    expect(normaliseSpaces(formatBookingTime("12:00"))).toBe("12:00 PM");
  });

  it("returns the original input when the time is not a number", () => {
    expect(formatBookingTime("not-a-time")).toBe("not-a-time");
  });
});

describe("formatStringToDate", () => {
  it("converts a YYYY-MM-DD string into a DateValue", () => {
    const result = formatStringToDate("2026-09-28");

    expect(result).not.toBeNull();
    expect(result?.toString()).toBe("2026-09-28");
  });

  it("returns null for an empty value", () => {
    expect(formatStringToDate("")).toBeNull();
  });
});

describe("formatDateToString", () => {
  it("converts a DateValue back into a YYYY-MM-DD string", () => {
    const dateValue = formatStringToDate("2026-09-28");

    expect(formatDateToString(dateValue)).toBe("2026-09-28");
  });

  it("returns an empty string when there is no date", () => {
    expect(formatDateToString(null)).toBe("");
    expect(formatDateToString(undefined)).toBe("");
  });

  it("round-trips without changing the day", () => {
    expect(formatDateToString(formatStringToDate("2026-01-01"))).toBe(
      "2026-01-01",
    );
  });
});
