import { services } from "@/lib/data/seed/services";
import type { Service } from "@/lib/validation/service.schema";
import { providers } from "../data/seed/providers";

export function getProviderServices(providerId: string): Service[] | undefined {
  const provider = providers.find((provider) => providerId === provider.id);

  if (provider) {
    return services.filter((service) =>
      provider.servicesIds.some((item) => service.id.includes(item)),
    );
  }
}
