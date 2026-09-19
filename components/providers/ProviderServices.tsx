import { Clock3 } from "lucide-react";
import { Button, Card } from "@heroui/react";
import Link from "next/link";

import { services } from "@/lib/data/seed/services";

type ProviderServicesProps = {
  providerId: string;
};

export function ProviderServices({ providerId }: ProviderServicesProps) {
  const providerServices = services.filter(
    (service) => service.providerId === providerId,
  );

  return (
    <section id="services" className="border-border border-b py-12">
      <div>
        <div>
          <h2 className="text-text-primary text-2xl font-semibold">Services</h2>

          <p className="text-text-secondary mt-2 text-sm">
            Explore the services offered by this professional.
          </p>
        </div>

        {providerServices.length > 0 ? (
          <div className="mt-6 grid gap-4">
            {providerServices.map((service) => (
              <Card
                key={service.id}
                variant="default"
                className="border-border bg-surface border shadow-sm"
              >
                <Card.Content className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-text-primary text-lg font-semibold">
                        {service.title}
                      </h3>

                      <p className="text-text-secondary mt-2 max-w-2xl text-sm leading-6">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="text-text-secondary flex items-center gap-1.5 text-sm">
                          <Clock3 className="size-4" />

                          <span>{service.durationMinutes} minutes</span>
                        </div>

                        <div className="bg-border h-4 w-px" />

                        <div>
                          <span className="text-text-secondary text-xs">
                            From
                          </span>

                          <span className="text-text-primary ml-1 font-semibold">
                            €{(service.priceCents / 100).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/book/${providerId}?service=${service.id}`}
                      className="shrink-0"
                    >
                      <Button variant="primary" className="w-full lg:w-auto">
                        Select Service
                      </Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border-border bg-surface mt-6 rounded-xl border p-8 text-center">
            <h3 className="text-text-primary font-semibold">
              No services available
            </h3>

            <p className="text-text-secondary mt-2 text-sm">
              This professional currently has no services listed.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
