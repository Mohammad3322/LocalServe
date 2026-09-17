import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { popularServices } from "@/lib/data/seed/home";
import { Card, Button } from "@heroui/react";

export function PopularServices() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-brand-600 text-sm font-semibold">
              Explore services
            </p>

            <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
              Popular services
            </h2>

            <p className="text-text-secondary mt-3 max-w-2xl">
              Find professionals across the services people use most.
            </p>
          </div>

          <Link
            href="/services"
            className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
          >
            View all services
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularServices.map((service) => {
            const Icon = service.icon;

            return (
              <Link href={service.href} key={service.id}>
                <Card className="border-border bg-background border p-2">
                  <Card.Content className="items-start p-5 text-left">
                    <div className="bg-brand-50 text-brand-600 flex size-12 items-center justify-center rounded-xl">
                      <Icon className="size-6" />
                    </div>

                    <h3 className="text-text-primary mt-5 font-semibold">
                      {service.title}
                    </h3>

                    <p className="text-text-secondary mt-2 text-sm leading-6">
                      {service.description}
                    </p>

                    <Button variant="tertiary" className="mt-4 px-0">
                      Explore
                      <ArrowRight className="size-4" />
                    </Button>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
