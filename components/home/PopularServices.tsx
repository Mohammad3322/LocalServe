import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { popularServices } from "@/lib/data/seed/home";

export function PopularServices() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-600 text-sm font-semibold">
              Popular Services
            </p>

            <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find the service you need
            </h2>

            <p className="text-text-secondary mt-4 text-base leading-7">
              Explore trusted professionals across our most popular service
              categories.
            </p>
          </div>

          <Link href="/services">
            <Button variant="tertiary">
              View all services
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Services */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularServices.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.id}
                variant="transparent"
                className="group hover:text-brand-700 hover:bg-brand-50 transition-color h-full text-center duration-200"
              >
                <Card.Content className="flex h-full flex-col items-center justify-center p-6">
                  {/* Icon */}
                  <div className="text-primary flex size-12 items-center justify-center rounded-xl">
                    <Icon className="size-12" />
                  </div>

                  {/* Content */}
                  <div className="mt-6 flex-1">
                    <Card.Title className="group-hover:text-brand-700 text-lg">
                      {service.title}
                    </Card.Title>

                    <Card.Description className="mt-2 leading-6">
                      {service.description}
                    </Card.Description>
                  </div>

                  {/* Link */}
                  <Link
                    href={service.href}
                    className="text-primary hover:text-primary/80 mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  >
                    Explore
                    <ArrowRight className="size-4" />
                  </Link>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
