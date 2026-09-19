import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { BadgeCheck, MapPin, Star } from "lucide-react";

import type { Provider } from "@/lib/validation/provider.schema";

type ProviderResultCardProps = {
  provider: Provider;
};

export function ProviderResultCard({ provider }: ProviderResultCardProps) {
  return (
    <Card
      variant="default"
      className="border-border bg-surface w-full overflow-hidden border shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <Card.Content className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Provider Image */}
          <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-56">
            <Image
              src={provider.imageUrl}
              alt={provider.name}
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              className="object-cover"
            />
          </div>

          {/* Provider Information */}
          <div className="flex min-w-0 flex-1 flex-col p-5">
            {/* Name + Verification */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-text-primary text-lg font-semibold">
                {provider.name}
              </h3>

              {provider.verified && (
                <span className="bg-brand-50 text-brand-700 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium">
                  <BadgeCheck className="size-3.5" />
                  Verified
                </span>
              )}
            </div>

            {/* Headline */}
            <p className="text-text-secondary mt-1 text-sm">
              {provider.headline}
            </p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-current text-amber-500" />

                <span className="text-text-primary text-sm font-semibold">
                  {provider.rating.toFixed(1)}
                </span>
              </div>

              <span className="text-text-secondary text-sm">
                ({provider.reviewCount} reviews)
              </span>
            </div>

            {/* Service Area */}
            <div className="text-text-secondary mt-3 flex items-center gap-2 text-sm">
              <MapPin className="size-4 shrink-0" />

              <span>{provider.serviceArea}</span>
            </div>

            {/* Price */}
            <div className="mt-5">
              <p className="text-text-secondary text-xs">Starting from</p>

              <p className="text-text-primary mt-0.5 text-base font-semibold">
                €{provider.startingPrice}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link href={`/providers/${provider.slug}`}>
                <Button variant="secondary" className="w-full sm:w-auto">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
