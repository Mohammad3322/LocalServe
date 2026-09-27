import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Book an appointment",
  robots: { index: false, follow: true },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
