// lib/generate-mock-data.ts

const firstNames = [
  "John",
  "Mikel",
  "Joney",
  "David",
  "Robert",
  "William",
  "James",
  "Alex",
  "Thomas",
  "Daniel",
  "Chris",
  "Kevin",
  "Mark",
  "Steven",
  "Paul",
];
const lastNames = [
  "Smith",
  "Philip",
  "Terry",
  "Johnson",
  "Brown",
  "Taylor",
  "Miller",
  "Davis",
  "Wilson",
  "Moore",
  "Anderson",
  "Martin",
  "Clark",
  "Lewis",
  "Hall",
];
const locationsList = ["Paris", "Marsilia", "Oxford", "Lil"];
const servicesTemplates = [
  {
    id: "solar-panel-installation",
    providerId: "pro-1",
    slug: "solar-panel-installation",
    title: "Solar Panel Installation",
    description: "Professional solar panel installation services.",
    durationMinutes: 180,
    priceCents: 85000,
    category: "solar-energy",
  },
  {
    id: "cctv-installation",
    providerId: "pro-2",

    slug: "cctv-installation",
    title: "CCTV Installation",
    description: "Professional CCTV installation and setup.",
    durationMinutes: 120,
    priceCents: 32000,
    category: "security-surveillance",
  },
  {
    id: "smart-home",
    providerId: "pro-3",

    slug: "smart-home",
    title: "Smart Home Installation",
    description: "Smart home installation and configuration.",
    durationMinutes: 150,
    priceCents: 18000,
    category: "electronic-services",
  },

  {
    id: "solar-battery-storage",
    providerId: "pro-3",

    title: "Solar Battery Storage Setup",
    description:
      "Solar Battery Storage SetupSolar Battery Storage SetupSolar Battery Storage Setups.",

    category: "solar-energy",
    price: 50000,
    duration: 120,
  },
  {
    id: "security-alarm-setup",
    providerId: "pro-3",

    title: "Security Alarm Configuration",
    description:
      "Security Alarm ConfigurationSecurity Alarm ConfigurationSecurity Alarm Configuration.",

    category: "security-surveillance",
    price: 25000,
    duration: 90,
  },
];

export function generateMockData() {
  const providers = [];
  const services = [];
  const reviews = [];
  const availability = [];

  for (let i = 1; i <= 50; i++) {
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[(i * 3) % lastNames.length];
    const name = `${fName} ${lName}`;
    const id = `pro-${i}`;
    const location = locationsList[i % locationsList.length];

    providers.push({
      id,
      slug: `pro-${i}-${fName.toLowerCase()}`,
      name,
      headline:
        i % 2 === 0
          ? "Solar installation & energy solutions"
          : "CCTV & security installation",
      imageUrl:
        i % 2 === 0
          ? "/images/providers/solar-tech-pro.jpg"
          : "/images/providers/securevision.jpg",
      rating: Number((4.5 + (i % 5) * 0.1).toFixed(1)),
      reviewCount: 20 + ((i * 3) % 100),
      servicesIds: [`serv-${i}-1`, `serv-${i}-2`],
      serviceArea: `${location} & nearby areas`,
      verified: true,
      startingPrice: 200 + ((i * 15) % 700),
      available: i % 5 !== 0,
      description:
        "Professional installation and maintenance services for residential and commercial properties.",
      experienceYears: 3 + (i % 8),
      credentials: [
        {
          title: "Certified Professional Installer",
          description:
            "Certified professional field experience and safety clearance.",
        },
      ],
      languages: ["English", "French"],
    });

    services.push({
      id: `serv-${i}-1`,
      providerId: id,
      slug: `solar-panel-installation-${i}`,
      title: servicesTemplates[0].title,
      description: servicesTemplates[0].description,
      durationMinutes: servicesTemplates[0].duration,
      price: servicesTemplates[0].price,
      category: servicesTemplates[0].category,
    });

    services.push({
      id: `serv-${i}-2`,
      providerId: id,
      slug: `cctv-installation-${i}`,
      title: servicesTemplates[1].title,
      //   description: servicesTemplates[1].description,
      durationMinutes: servicesTemplates[1].duration,
      priceCents: servicesTemplates[1].price,
      category: servicesTemplates[1].category,
    });

    for (let r = 1; r <= 12; r++) {
      reviews.push({
        id: `review-${i}-${r}`,
        providerId: id,
        customerName: `Client ${i}-${r}`,
        rating: r % 2 === 0 ? 5 : 4,
        comment:
          "Professional service from start to finish. Highly recommended!",
        createdAt: `2026-08-${(r % 28) + 1}`,
      });
    }

    for (let d = 1; d <= 10; d++) {
      const hourNum = 9 + (d % 8);
      const formattedHour = hourNum < 10 ? `0${hourNum}` : `${hourNum}`;

      availability.push({
        id: `slot-${i}-${d}`,
        providerId: id,
        serviceId: `serv-${i}-1`,
        date: `2026-10-${d < 10 ? "0" + d : d}`,
        time: `${formattedHour}:00`,
        available: d % 3 !== 0,
      });
    }
  }

  const locations = [
    { id: "paris", name: "Paris" },
    { id: "marsilia", name: "Marsilia" },
    { id: "oxford", name: "Oxford" },
    { id: "lil", name: "Lil" },
  ];

  return { providers, services, reviews, locations, availability };
}
