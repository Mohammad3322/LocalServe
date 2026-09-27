export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProviderAbout } from "@/components/providers/ProviderAbout";
import { ProviderHeader } from "@/components/providers/ProviderHeader";
import { ProviderServices } from "@/components/providers/ProviderServices";
import { getProviderBySlug } from "@/lib/services/providers";
import { ProviderReviews } from "@/components/providers/ProviderReviews";
import { ProviderServiceArea } from "@/components/providers/ProviderServiceArea";
import { ProviderAvailability } from "@/components/providers/ProviderAvailability";
import { ProviderBookingSidebar } from "@/components/providers/ProviderBookingSidebar";
import { getProviderServices } from "@/lib/services/providerServices";
import { absoluteUrl, buildMetadata, clampDescription } from "@/lib/seo";

type ProviderPageProps = {
  params: Promise<{
    providerSlug: string;
  }>;
  searchParams: Promise<{
    service?: string;
  }>;
};

/**
 * Section 8.4: a profile page is the main indexable page for a provider, so its
 * title and description are built from that provider's own data. Two profiles
 * therefore never share metadata, and the description matches the copy on the
 * page.
 */
export async function generateMetadata({
  params,
}: ProviderPageProps): Promise<Metadata> {
  const { providerSlug } = await params;
  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    return { title: "Professional not found" };
  }

  const serviceTitles = getProviderServices(provider.id).map(
    (service) => service.title,
  );

  const description = clampDescription(
    `${provider.headline} ${provider.name} is rated ${provider.rating} from ` +
      `${provider.reviewCount} reviews and offers ${serviceTitles.join(", ")} ` +
      `in ${provider.serviceArea}.`,
  );

  return buildMetadata({
    title: `${provider.name} - ${provider.headline}`,
    description,
    path: `/providers/${provider.slug}`,
  });
}

/**
 * Section 8.5: the structured data describes the professional as a local
 * business with the rating and service area shown on the page, so a search engine
 * can understand the listing without scraping the layout.
 */
const structuredData = (provider: NonNullable<ReturnType<typeof getProviderBySlug>>) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: provider.name,
  description: provider.description,
  url: absoluteUrl(`/providers/${provider.slug}`),
  image: absoluteUrl(provider.imageUrl),
  areaServed: provider.serviceArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: provider.serviceArea.replace(" & nearby areas", ""),
    addressCountry: "FR",
  },
  ...(provider.reviewCount > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: provider.rating,
          reviewCount: provider.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
});

export default async function ProviderPage({
  params,
  searchParams,
}: ProviderPageProps) {
  const { providerSlug } = await params;
  const { service } = await searchParams;

  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        // The payload is built from validated seed data, and JSON.stringify
        // escapes the characters that could otherwise close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(provider)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <ProviderHeader provider={provider} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ProviderAbout provider={provider} />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ProviderServices providerId={provider.id} />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ProviderServiceArea provider={provider} />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ProviderAvailability providerId={provider.id} />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ProviderReviews providerId={provider.id} />
            </div>
          </div>
          <ProviderBookingSidebar
            provider={provider}
            selectedServiceId={service}
          />
        </div>
      </div>
    </main>
  );
}
