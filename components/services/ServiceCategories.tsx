import { ServiceCategoryCard } from "./ServiceCategoryCard";

const categories = [
  {
    title: "Solar Energy",
    description: "Professional solar energy services for homes and businesses.",
    slug: "solar-energy",
    services: [
      "Solar Panel Installation",
      "Solar Maintenance",
      "Inverter Installation",
      "Battery Storage",
    ],
  },
  {
    title: "Security & Surveillance",
    description:
      "Reliable security and surveillance solutions from local professionals.",
    slug: "security-surveillance",
    services: [
      "CCTV Installation",
      "CCTV Maintenance",
      "Alarm Systems",
      "Access Control",
    ],
  },
  {
    title: "Electronic Services",
    description: "Professional electronic and smart technology services.",
    slug: "electronic-services",
    services: ["Network Installation", "Smart Home", "Intercom Installation"],
  },
];

export function ServiceCategories() {
  return (
    <section className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-brand-600 text-sm font-semibold">Services</p>

          <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
            Find the right service for your needs
          </h2>

          <p className="text-text-secondary mt-4 text-base leading-7">
            Explore our service categories and connect with professionals who
            can help.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <ServiceCategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
