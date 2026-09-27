import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

export default function BookingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
