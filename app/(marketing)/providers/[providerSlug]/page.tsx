import { notFound } from "next/navigation";

import { ProviderAbout } from "@/components/providers/ProviderAbout";
import { ProviderHeader } from "@/components/providers/ProviderHeader";
import { ProviderServices } from "@/components/providers/ProviderServices";
import { getProviderBySlug } from "@/lib/services/providers";
import { ProviderReviews } from "@/components/providers/ProviderReviews";
import { ProviderServiceArea } from "@/components/providers/ProviderServiceArea";
import { ProviderAvailability } from "@/components/providers/ProviderAvailability";
import { ProviderBookingSidebar } from "@/components/providers/ProviderBookingSidebar";

type ProviderPageProps = {
  params: Promise<{
    providerSlug: string;
  }>;
  searchParams: Promise<{
    service?: string;
  }>;
};

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
