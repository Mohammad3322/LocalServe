import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Browse every service category on LocalServe, from solar energy and security " +
    "surveillance to electrical, heating and general trades.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
