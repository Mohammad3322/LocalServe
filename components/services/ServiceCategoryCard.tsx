import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sun, Wifi } from "lucide-react";

type ServiceCategoryCardProps = {
  title: string;
  description: string;
  slug: string;
  services: string[];
};

const icons = {
  "solar-energy": Sun,
  "security-surveillance": ShieldCheck,
  "electronic-services": Wifi,
};

export function ServiceCategoryCard({
  title,
  description,
  slug,
  services,
}: ServiceCategoryCardProps) {
  const Icon = icons[slug as keyof typeof icons] ?? ShieldCheck;

  return (
    <Card
      variant="default"
      className="group border-border bg-background h-full border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <Card.Content className="flex h-full flex-col p-6">
        <div className="bg-brand-50 text-brand-600 flex size-12 items-center justify-center rounded-xl">
          <Icon className="size-6" />
        </div>

        <h3 className="text-text-primary mt-5 text-xl font-semibold">
          {title}
        </h3>

        <p className="text-text-secondary mt-2 text-sm leading-6">
          {description}
        </p>

        <ul className="mt-6 space-y-3">
          {services.map((service) => (
            <li
              key={service}
              className="text-text-secondary flex items-start gap-2 text-sm"
            >
              <CheckCircle2 className="text-brand-600 mt-0.5 size-4 shrink-0" />
              <span>{service}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/services/${slug}`}
          className="text-brand-600 hover:text-brand-700 mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          Explore services
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Card.Content>
    </Card>
  );
}
