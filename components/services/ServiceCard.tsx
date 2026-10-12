import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight, Clock3 } from "lucide-react";
import MyButton from "../ui/MyButton";
import type { Service } from "@/lib/validation/service.schema";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const priceInDollars = Math.round(service.priceCents / 100);
  const margin = Math.max(50, Math.round(priceInDollars * 0.15));
  const minPrice = Math.max(0, priceInDollars - margin);
  const maxPrice = priceInDollars + margin;

  const searchParams = new URLSearchParams({
    service: service.title,
    category: service.category,
    price: `${minPrice}-${maxPrice}`,
  });

  return (
    <Card
      variant="default"
      className="border-border bg-background border shadow-sm transition-shadow hover:shadow-md"
    >
      <Card.Content className="p-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div className="min-w-0">
            <h3 className="text-text-primary text-xl font-semibold">
              {service.title}
            </h3>

            <p className="text-text-secondary mt-2 text-sm leading-6">
              {service.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="text-text-secondary flex items-center gap-1.5 text-sm">
                <Clock3 className="size-4" />
                <span>{service.durationMinutes} minutes</span>
              </div>

              <div className="bg-border h-4 w-px" />

              <div className="text-sm">
                <span className="text-text-secondary">From </span>
                <span className="text-text-primary font-semibold">
                  €{priceInDollars}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 sm:self-end">
            <Link href={`/search?${searchParams.toString()}`}>
              <MyButton variant="primary" className="w-full sm:w-auto">
                Find Providers
                <ArrowRight className="size-4" />
              </MyButton>
            </Link>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
