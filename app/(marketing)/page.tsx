import { FeaturedProviders } from "@/components/home/FeaturedProviders";
import { FaqPreview } from "@/components/home/FaqPreview";
import { Hero } from "@/components/home/Hero";
import { HomeCta } from "@/components/home/HomeCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PopularServices } from "@/components/home/PopularServices";
import { TrustSection } from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <PopularServices />

      <FeaturedProviders />

      <HowItWorks />

      <TrustSection />

      <FaqPreview />

      <HomeCta />
    </main>
  );
}
