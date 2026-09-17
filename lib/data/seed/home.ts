import type { LucideIcon } from "lucide-react";
import {
  Camera,
  House,
  LockKeyhole,
  PanelsTopLeft,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export type PopularService = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const popularServices: PopularService[] = [
  {
    id: "solar-energy",
    title: "Solar Energy",
    description: "Installation, maintenance, inverters and battery systems.",
    icon: PanelsTopLeft,
    href: "/services/solar-energy",
  },
  {
    id: "security-surveillance",
    title: "Security & Surveillance",
    description: "CCTV, alarms and access control solutions.",
    icon: Camera,
    href: "/services/security-surveillance",
  },
  {
    id: "electronic-services",
    title: "Electronic Services",
    description: "Networking, smart home and electronic installations.",
    icon: Wrench,
    href: "/services/electronic-services",
  },
  {
    id: "more-services",
    title: "More Services",
    description: "Explore more local professional services.",
    icon: House,
    href: "/services",
  },
];

export const trustPoints = [
  {
    title: "Verified Professionals",
    description:
      "Find providers with clear professional information and verification status.",
    icon: ShieldCheck,
  },
  {
    title: "Clear Service Information",
    description:
      "Compare services, pricing, experience and availability before booking.",
    icon: LockKeyhole,
  },
  {
    title: "Simple Booking",
    description:
      "Choose a service, select a suitable time and confirm your appointment.",
    icon: House,
  },
];