/**
 * Availability seed data.
 *
 * Built in ./generate.ts. Dates are generated relative to today rather than
 * hard-coded, so the booking flow does not silently lose its bookable slots as
 * real time passes. Section 1.2 asks for "several weeks per provider".
 */
export { availability, AVAILABILITY_DAYS } from "@/lib/data/seed/generate";
