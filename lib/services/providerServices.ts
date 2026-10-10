import { services } from "@/lib/data/seed/generate";
import type { Service } from "@/lib/validation/service.schema";

export function getProviderServices(providerId: string): Service[] {
  return services.filter((service) => service.providerId === providerId);
}
