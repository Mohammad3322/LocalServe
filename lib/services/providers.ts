import { providers } from "@/lib/data/seed/providers";
import type { Provider } from "@/lib/validation/provider.schema";

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export function getProviderById(id: string): Provider | undefined {
  return providers.find((provider) => provider.id === id);
}

export function getProviderSlug(providerId: string | null): string | undefined {
  if (providerId) {
    const provider = getProviderById(providerId);
    return provider ? provider.slug : undefined;
  }
}
