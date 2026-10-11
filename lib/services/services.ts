import { services } from "@/lib/data/seed/generate";
import type { Service } from "@/lib/validation/service.schema";

export function getServiceById(serviceId: string): Service[] {
  return services.filter((service) => service.id === serviceId);
}
