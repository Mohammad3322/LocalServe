import { ServicesCTA } from "./ServicesCTA";
import { ServicesHero } from "./ServicesHero";
import { ServiceCategories } from "./ServiceCategories";
import { HowItWorks } from "../home/HowItWorks";

export function ServicesPage() {
  return (
    <main className="bg-background min-h-screen">
      <ServicesHero />
      <ServiceCategories />
      <HowItWorks />
      <ServicesCTA />
    </main>
  );
}
