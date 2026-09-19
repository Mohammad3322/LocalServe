import Link from "next/link";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { ArrowRight, MapPin, Star, BadgeCheck } from "lucide-react";

import { featuredProviders } from "@/lib/data/seed/providers";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function FeaturedProviders() {
  return (
    <section className="bg-brand-50/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-600 text-sm font-semibold">
              Featured Professionals
            </p>

            <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted professionals near you
            </h2>

            <p className="text-text-secondary mt-4 text-base leading-7">
              Explore experienced professionals and compare their services
              before making your booking.
            </p>
          </div>

          <Link href="/search">
            <Button variant="tertiary">
              View all professionals
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Providers */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProviders.map((provider) => (
            <Card
              key={provider.id}
              variant="default"
              className="h-full overflow-hidden transition-shadow duration-200 hover:shadow-lg"
            >
              <Card.Content className="flex h-full flex-col p-6">
                {/* Provider identity */}
                <div className="flex items-start gap-4">
                  <Avatar size="lg" color="accent">
                    <Avatar.Image src={provider.imageUrl} alt={provider.name} />

                    <Avatar.Fallback>
                      {getInitials(provider.name)}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Card.Title className="text-lg">
                        {provider.name}
                      </Card.Title>

                      {provider.verified && (
                        <Chip size="sm" variant="soft" color="accent">
                          <BadgeCheck className="size-3.5" />
                          Verified
                        </Chip>
                      )}
                    </div>

                    <Card.Description className="mt-1">
                      {provider.headline}
                    </Card.Description>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-current text-amber-500" />

                    <span className="text-text-primary text-sm font-semibold">
                      {provider.rating}
                    </span>
                  </div>

                  <span className="text-text-secondary text-sm">
                    ({provider.reviewCount} reviews)
                  </span>
                </div>

                {/* Service area */}
                <div className="text-text-secondary mt-4 flex items-center gap-2 text-sm">
                  <MapPin className="size-4 shrink-0" />

                  <span>{provider.serviceArea}</span>
                </div>

                {/* Price */}
                <div className="border-border mt-6 border-t pt-5">
                  <p className="text-text-secondary text-xs">Starting from</p>

                  <p className="text-text-primary mt-1 text-xl font-bold">
                    €{provider.startingPrice}
                  </p>
                </div>

                {/* Action */}
                <Link href={`/providers/${provider.slug}`} className="mt-6">
                  <Button variant="outline" fullWidth>
                    View Profile
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
