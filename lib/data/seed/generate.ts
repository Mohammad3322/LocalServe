/**
 * Deterministic seed data generator (discription.doc, section 1.2 "Working Scale
 * Assumptions").
 *
 * Section 1.2 sets the portfolio working scale at 50-150 providers, 2-8 services
 * per provider, 500-2,000 reviews and "several weeks" of availability per
 * provider. The previous hand-written seed held 6 providers, one service each and
 * ten reviews, so pagination could never produce a second page and the empty
 * states were unreachable.
 *
 * Two properties matter as much as the volume:
 *
 * 1. Determinism. Every value is derived from a fixed seed, so the server and the
 *    browser produce byte-identical data. `Math.random()` would cause hydration
 *    mismatches and make tests unreproducible.
 *
 * 2. Referential integrity by construction. Providers, services, availability and
 *    reviews are built here together, so a provider's `servicesIds` cannot drift
 *    away from the services that actually belong to it. The old seed had pro-6
 *    advertising `smart-home`, which pro-3 owned, so a service search returned a
 *    provider with no such service.
 *
 * Availability is generated relative to today rather than hard-coded, because the
 * old fixed dates (2026-09-25 to 2026-10-05) had already started falling into the
 * past, which silently removes bookable slots from the booking flow.
 */
import type { AvailabilitySlot } from "@/lib/validation/availability.schema";
import type { Provider } from "@/lib/validation/provider.schema";
import type { Review } from "@/lib/validation/review.schema";
import type { Service } from "@/lib/validation/service.schema";

/** Section 1.2 asks for 50-150 providers. */
export const PROVIDER_COUNT = 60;

/** How many days ahead availability is generated ("several weeks"). */
export const AVAILABILITY_DAYS = 21;

/**
 * A mulberry32 PRNG. Small, fast and, most importantly, repeatable: the same seed
 * always yields the same sequence, on the server and in the browser.
 */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  "Sarah",
  "James",
  "Amelia",
  "Oliver",
  "Priya",
  "Lucas",
  "Yasmin",
  "Hugo",
  "Chloe",
  "Tomas",
  "Nadia",
  "Elliot",
  "Fatima",
  "Marcus",
  "Ines",
  "Ravi",
  "Sofia",
  "Daniel",
  "Leila",
  "Victor",
  "Hannah",
  "Noah",
  "Zara",
  "Felix",
  "Aisha",
  "Oscar",
  "Maya",
  "Luca",
  "Elena",
  "Samuel",
  "Nina",
  "Arthur",
  "Clara",
  "Diego",
  "Ruth",
  "Karim",
  "Julia",
  "Adam",
  "Leah",
  "Pedro",
  "Eva",
  "Tariq",
  "Grace",
  "Simon",
  "Anya",
  "Jonas",
  "Rosa",
  "Malik",
  "Iris",
  "Pablo",
] as const;

const LAST_NAMES = [
  "Johnson",
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
  "Morel",
  "Girard",
  "Andre",
  "Lefevre",
  "Mercier",
  "Blanc",
  "Guerin",
  "Boyer",
  "Chevalier",
  "Nguyen",
  "Patel",
  "Khan",
  "Silva",
  "Okafor",
  "Haddad",
  "Novak",
  "Fischer",
  "Weber",
  "Rossi",
  "Esposito",
  "Ferrari",
  "Yilmaz",
  "Nagy",
  "Kowalski",
  "Andersen",
  "Larsen",
  "Virtanen",
  "Bakker",
  "Janssen",
  "Costa",
  "Almeida",
] as const;

/**
 * Locations double as the searchable "service area" text, so the ids and names
 * have to agree. The old seed shipped `id: "Lion", name: "Oxford"` plus a typo
 * ("Marsilia") and a meaningless entry ("Lil").
 */
const LOCATIONS = [
  { id: "paris", name: "Paris" },
  { id: "marseille", name: "Marseille" },
  { id: "lyon", name: "Lyon" },
  { id: "toulouse", name: "Toulouse" },
  { id: "bordeaux", name: "Bordeaux" },
  { id: "lille", name: "Lille" },
  { id: "nantes", name: "Nantes" },
  { id: "strasbourg", name: "Strasbourg" },
  { id: "montpellier", name: "Montpellier" },
  { id: "nice", name: "Nice" },
  { id: "rennes", name: "Rennes" },
  { id: "reims", name: "Reims" },
] as const;

/**
 * The service catalogue. `slug` is the public, category-level slug used by
 * /services/[serviceSlug]; a provider offering the same service type gets its own
 * service id but shares the slug.
 */
type ServiceTemplate = {
  key: string;
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  category: string;
};

const SERVICE_TEMPLATES: readonly ServiceTemplate[] = [
  {
    key: "solar-panel-installation",
    slug: "solar-panel-installation",
    title: "Solar Panel Installation",
    description:
      "End-to-end photovoltaic installation for homes and small businesses, including roof assessment, mounting, wiring and commissioning.",
    durationMinutes: 180,
    priceCents: 85000,
    category: "solar-energy",
  },
  {
    key: "cctv-installation",
    slug: "cctv-installation",
    title: "CCTV Installation",
    description:
      "Security camera installation and setup with remote viewing configuration, covering indoor and outdoor coverage.",
    durationMinutes: 120,
    priceCents: 32000,
    category: "security-surveillance",
  },
  {
    key: "smart-home",
    slug: "smart-home",
    title: "Smart Home Installation",
    description:
      "Smart home setup and configuration across lighting, heating, security and voice assistants, integrated into one app.",
    durationMinutes: 150,
    priceCents: 18000,
    category: "electronic-services",
  },
  {
    key: "solar-battery-storage",
    slug: "solar-battery-storage",
    title: "Solar Battery Storage Setup",
    description:
      "Battery storage installation sized to your consumption, with inverter integration and monitoring setup.",
    durationMinutes: 120,
    priceCents: 50000,
    category: "solar-energy",
  },
  {
    key: "security-alarm-setup",
    slug: "security-alarm-setup",
    title: "Security Alarm Configuration",
    description:
      "Alarm system installation and configuration, including sensor placement, arming modes and notification routing.",
    durationMinutes: 90,
    priceCents: 25000,
    category: "security-surveillance",
  },
  {
    key: "electrician",
    slug: "electrician",
    title: "Electrical Installation",
    description:
      "Consumer unit upgrades, socket and lighting installation, and fault-finding for residential and rental properties.",
    durationMinutes: 120,
    priceCents: 21000,
    category: "electrical-services",
  },
  {
    key: "heat-pump",
    slug: "heat-pump",
    title: "Heat Pump Installation",
    description:
      "Air-to-water and air-to-air heat pump installation with radiator upgrades and full commissioning.",
    durationMinutes: 300,
    priceCents: 145000,
    category: "heating-cooling",
  },
  {
    key: "ev-charger",
    slug: "ev-charger",
    title: "EV Charger Installation",
    description:
      "Home and workplace EV charge point installation, including load balancing and grant paperwork support.",
    durationMinutes: 180,
    priceCents: 64000,
    category: "electrical-services",
  },
  {
    key: "network-installation",
    slug: "network-installation",
    title: "Network Installation",
    description:
      "Structured cabling and Wi-Fi coverage installation for home offices and small business premises.",
    durationMinutes: 210,
    priceCents: 39000,
    category: "electronic-services",
  },
  {
    key: "door-installation",
    slug: "door-installation",
    title: "Door Installation",
    description:
      "Interior and exterior door fitting, alignment and hardware replacement, with old door removal.",
    durationMinutes: 150,
    priceCents: 27000,
    category: "general-trades",
  },
] as const;

/**
 * The five service ids the existing end-to-end journeys navigate to by hand. They
 * are pinned here so the booking, slot-conflict and mobile specs keep working
 * against generated data.
 *
 * The value is the template slug, not just an id: pinning the id alone would let
 * `solar-panel-installation` end up titled "Heat Pump Installation", which would
 * make `/book/pro-1?service=solar-panel-installation` show the wrong job.
 */
const LEGACY_SERVICE_IDS: Readonly<Record<string, string>> = {
  "pro-1": "solar-panel-installation",
  "pro-2": "cctv-installation",
  "pro-3": "smart-home",
  "pro-4": "solar-panel-installation",
  "pro-5": "cctv-installation",
};

/** How the pinned id for each provider differs from the shared template slug. */
const LEGACY_SERVICE_ID_OVERRIDES: Readonly<Record<string, string>> = {
  "pro-4": "solar-panel-installation-2",
  "pro-5": "cctv-installation-2",
};

const CREDENTIAL_TEMPLATES = [
  {
    title: "Certified Professional Installer",
    description:
      "Certified professional field experience and safety clearance.",
  },
  {
    title: "Electrical Systems Certification",
    description:
      "Qualified to work with residential and commercial electrical systems.",
  },
  {
    title: "Manufacturer Approved Partner",
    description:
      "Trained and certified by the equipment manufacturers we install for.",
  },
  {
    title: "Public Liability Insurance",
    description:
      "Insured for public liability and workmanship on every installation.",
  },
] as const;

const REVIEW_COMMENTS = [
  "Professional service from start to finish. Highly recommended!",
  "Arrived on time, explained everything clearly and left the place spotless.",
  "Great communication throughout. The work was completed in a single visit.",
  "Fair quote, no surprises. I would use this company again without hesitation.",
  "Very tidy workmanship and a proper clean up afterwards.",
  "Helpful and patient with all my questions before booking.",
  "Excellent attention to detail. Everything was tested before they left.",
  "Responsive when I had to reschedule. No problem at all.",
  "Solid work and sensible advice. Saved me money on a better option.",
  "Turned up when they said they would. That alone is worth a lot.",
  "Really pleased with the result, it has made a big difference.",
  "Friendly team and a straightforward process from quote to completion.",
] as const;

const CUSTOMER_NAMES = [
  "Sophie L.",
  "Tom R.",
  "Amina K.",
  "Peter M.",
  "Laura B.",
  "Yusuf D.",
  "Elena P.",
  "Marc T.",
  "Nina V.",
  "Owen H.",
  "Chloe F.",
  "Ravi S.",
  "Marta G.",
  "James C.",
  "Lina W.",
  "Hugo N.",
] as const;

const LANGUAGES = [
  "French",
  "English",
  "Spanish",
  "Arabic",
  "Portuguese",
] as const;

const HEADLINE_TEMPLATES = [
  "Solar installation & energy solutions",
  "CCTV & security installation specialist",
  "Smart home automation expert",
  "Certified electrician for homes & small businesses",
  "Heating, cooling & renewable energy specialist",
  "EV charging and electrical installation",
  "Networks, cabling and smart home technology",
  "Doors, carpentry and general repairs",
] as const;

/** Section 8.2: public routing should be human-readable, not an internal id. */
function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();

  return day === 0 || day === 6;
}

/** Working hours an installer would realistically offer, in 30 minute steps. */
const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
] as const;

type SeedData = {
  providers: Provider[];
  services: Service[];
  reviews: Review[];
  availability: AvailabilitySlot[];
  locations: { id: string; name: string }[];
};

/**
 * Builds the whole dataset in one pass. The random stream is consumed in a fixed
 * order so the output only depends on the seed, never on iteration accidents.
 */
function buildSeedData(): SeedData {
  const random = createRandom(20260927);

  /** Inclusive integer in [min, max]. */
  const between = (min: number, max: number) =>
    min + Math.floor(random() * (max - min + 1));

  /** Picks one item deterministically. */
  const pick = <T>(items: readonly T[]): T =>
    items[Math.floor(random() * items.length)];

  /** Picks `count` distinct items, preserving a stable order. */
  const pickSome = <T>(items: readonly T[], count: number): T[] => {
    const start = Math.floor(random() * items.length);
    const chosen: T[] = [];

    for (let offset = 0; offset < count; offset += 1) {
      chosen.push(items[(start + offset) % items.length]);
    }

    return chosen;
  };

  const providers: Provider[] = [];
  const services: Service[] = [];
  const reviews: Review[] = [];
  const availability: AvailabilitySlot[] = [];

  for (let index = 0; index < PROVIDER_COUNT; index += 1) {
    const number = index + 1;
    const id = `pro-${number}`;

    // The surname cycles per provider rather than changing only after the first
    // name list wraps, otherwise the first 50 providers would all be called
    // "... Johnson". The first names are unique, so the full name stays unique.
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName = LAST_NAMES[index % LAST_NAMES.length];
    const name = `${firstName} ${lastName}`;

    const location = LOCATIONS[index % LOCATIONS.length];

    // Section 1.2 asks for 2-8 services per provider.
    const serviceCount = between(2, 5);

    // A provider's first service is the one the hand-written journeys use, so the
    // template is forced to match the pinned id rather than left to chance.
    const pinnedTemplateSlug = LEGACY_SERVICE_IDS[id];
    const pinnedTemplate = pinnedTemplateSlug
      ? SERVICE_TEMPLATES.find(
          (template) => template.slug === pinnedTemplateSlug,
        )
      : undefined;
    // The pinned template counts towards the total, so only the remainder is
    // drawn at random.
    const randomCount = Math.max(serviceCount - (pinnedTemplate ? 1 : 0), 0);
    const remainingTemplates = pickSome(
      SERVICE_TEMPLATES.filter(
        (template) => template.slug !== pinnedTemplateSlug,
      ),
      randomCount,
    );
    const chosenTemplates = pinnedTemplate
      ? [pinnedTemplate, ...remainingTemplates]
      : remainingTemplates;

    const pinnedId =
      (pinnedTemplateSlug && LEGACY_SERVICE_ID_OVERRIDES[id]) ||
      pinnedTemplateSlug;

    const providerServiceIds: string[] = [];

    chosenTemplates.forEach((template, serviceIndex) => {
      const isFirst = serviceIndex === 0;

      const serviceId =
        isFirst && pinnedId
          ? pinnedId
          : `${template.key}-${id}-${serviceIndex + 1}`;

      const priceVariance = isFirst && pinnedId ? 0 : between(-4, 4) * 500;

      services.push({
        id: serviceId,
        slug: template.slug,
        providerId: id,
        title: template.title,
        description: template.description,
        durationMinutes: template.durationMinutes,
        priceCents: Math.max(5000, template.priceCents + priceVariance),
        category: template.category,
      });

      providerServiceIds.push(serviceId);
    });

    const providerServices = services.filter(
      (service) => service.providerId === id,
    );
    const startingPrice = Math.min(
      ...providerServices.map((service) => service.priceCents),
    );

    const experienceYears = between(3, 22);
    const reviewCount = between(8, 12);
    const publishedReviewCount = between(48, 176);

    const languages = pickSome(LANGUAGES, between(1, 3));
    const credentials = pickSome(CREDENTIAL_TEMPLATES, between(1, 3));

    providers.push({
      id,
      slug: toSlug(name),
      name,
      headline: pick(HEADLINE_TEMPLATES),
      imageUrl: "/images/providers/solar-tech-pro.jpg",

      rating:
        Number(
          (
            reviews.reduce((total, review) => total + review.rating, 0) /
            reviews.length
          ).toFixed(1),
        ) || 0,
      reviewCount: publishedReviewCount,

      servicesIds: providerServiceIds,
      serviceArea: `${location.name} & nearby areas`,
      verified: random() > 0.12,

      startingPrice: Math.round(startingPrice / 100),

      available: random() > 0.15,

      description: `${name} is a ${pick(HEADLINE_TEMPLATES).toLowerCase()} based in ${location.name}, serving residential and small business customers for over ${experienceYears} years. Every job is quoted before work starts and covered by a workmanship guarantee.`,

      experienceYears,

      credentials: [...credentials],

      languages: [...languages],
    });

    for (let reviewIndex = 0; reviewIndex < reviewCount; reviewIndex += 1) {
      const daysAgo = between(1, 150);
      const createdAt = new Date(Date.now() - daysAgo * MS_PER_DAY);

      reviews.push({
        id: `review-${id}-${reviewIndex + 1}`,
        providerId: id,
        customerName: pick(CUSTOMER_NAMES),

        rating: random() > 0.18 ? 5 : random() > 0.35 ? 4 : 3,
        comment: pick(REVIEW_COMMENTS),
        createdAt: toDateString(createdAt),
      });
    }

    for (let dayOffset = 0; dayOffset < AVAILABILITY_DAYS; dayOffset += 1) {
      const date = new Date(Date.now() + dayOffset * MS_PER_DAY);

      if (isWeekend(date)) {
        continue;
      }

      const dayTimes = pickSome(TIME_SLOTS, providerServiceIds.length);

      providerServiceIds.forEach((providerServiceId, serviceIndex) => {
        availability.push({
          id: `slot-${id}-${dayOffset}-${serviceIndex + 1}`,
          providerId: id,
          serviceId: providerServiceId,
          date: toDateString(date),
          time: dayTimes[serviceIndex],

          available: random() > 0.12,
        });
      });
    }
  }

  return {
    providers,
    services,
    reviews,
    availability,
    locations: [...LOCATIONS],
  };
}

const seedData = buildSeedData();

export const providers: Provider[] = seedData.providers;
export const services: Service[] = seedData.services;
export const reviews: Review[] = seedData.reviews;
export const availability: AvailabilitySlot[] = seedData.availability;
export const locations: { id: string; name: string }[] = seedData.locations;
