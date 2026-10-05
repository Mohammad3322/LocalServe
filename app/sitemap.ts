import type { MetadataRoute } from "next";

import { providers } from "@/lib/data/seed/generate";
import { serviceCategories } from "@/lib/data/seed/categories";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/faq"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = serviceCategories.map(
    (category) => ({
      url: absoluteUrl(`/services/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const providerRoutes: MetadataRoute.Sitemap = providers.map((provider) => ({
    url: absoluteUrl(`/providers/${provider.slug}`),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...providerRoutes];
}
