import { ServicesCTA } from "./ServicesCTA";
import { ServicesHero } from "./ServicesHero";
import { ServiceCategories } from "./ServiceCategories";
import { HowItWorks } from "../home/HowItWorks";

type ServicePageProps = {
  serviceQuery?: string;
};

export function ServicesPage({ serviceQuery }: ServicePageProps) {
  return (
    <main className="bg-background min-h-screen">
      <ServicesHero />
      <ServiceCategories serviceQuery={serviceQuery} />
      <HowItWorks />
      <ServicesCTA />
    </main>
  );
}
