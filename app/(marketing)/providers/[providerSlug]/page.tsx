import { notFound } from "next/navigation";

import { ProviderAbout } from "@/components/providers/ProviderAbout";
import { ProviderHeader } from "@/components/providers/ProviderHeader";
import { ProviderServices } from "@/components/providers/ProviderServices";
import { getProviderBySlug } from "@/lib/services/providers";
import Reviews from "@/components/providers/Reviews";

type ProviderPageProps = {
  params: Promise<{
    providerSlug: string;
  }>;
};

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { providerSlug } = await params;

  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen">
      <ProviderHeader provider={provider} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProviderAbout provider={provider} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProviderServices providerId={provider.id} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reviews slug={provider.slug} />
      </div>
    </main>
  );
}
