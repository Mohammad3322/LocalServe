import { featuredProviders } from "@/lib/data/seed/providers";
import type { Provider } from "@/lib/validation/provider.schema";

export function getProviderBySlug(
  slug: string,
): Provider | undefined {
  return featuredProviders.find(
    (provider) => provider.slug === slug,
  );
}