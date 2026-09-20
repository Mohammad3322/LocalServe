import { Card } from "@heroui/react";
import { MapPin } from "lucide-react";

import type { Provider } from "@/lib/validation/provider.schema";

type ProviderServiceAreaProps = {
  provider: Provider;
};

export function ProviderServiceArea({ provider }: ProviderServiceAreaProps) {
  return (
    <section id="service-area" className="border-border border-b py-12">
      <div>
        <div>
          <h2 className="text-text-primary text-2xl font-semibold">
            Service Area
          </h2>

          <p className="text-text-secondary mt-2 text-sm">
            Areas where this professional provides services.
          </p>
        </div>

        <Card
          variant="default"
          className="border-border bg-surface mt-6 border shadow-sm"
        >
          <Card.Content className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 flex size-11 shrink-0 items-center justify-center rounded-full">
                <MapPin className="text-brand-600 size-5" />
              </div>

              <div>
                <h3 className="text-text-primary font-semibold">
                  Service coverage
                </h3>

                <p className="text-text-secondary mt-1 text-sm leading-6">
                  {provider.serviceArea}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
