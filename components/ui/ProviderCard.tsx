import { Avatar, Card, Chip } from "@heroui/react";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MyButton from "./MyButton";
import type { SearchResultItem } from "@/lib/services/search";

type ProviderCardProps = {
  item: SearchResultItem;
};

function ProviderCard({ item }: ProviderCardProps) {
  const { provider, matchedService } = item;
  const matchedPrice = Math.round(matchedService.priceCents / 100);

  return (
    <Card
      variant="default"
      className="h-full overflow-hidden transition-shadow duration-200 hover:shadow-lg"
    >
      <Card.Content className="flex h-full flex-col p-6">
        <div className="flex items-center gap-4">
          <Avatar size="lg" color="accent" className="h-28 w-28 rounded-full">
            <Image
              src={provider.imageUrl}
              alt={provider.name}
              width={200}
              height={200}
              className=""
            />

            {/* <Avatar.Fallback>{provider.name.slice(0, 1)}</Avatar.Fallback> */}
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Card.Title className="text-lg">{provider.name}</Card.Title>

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

        <div className="text-text-secondary mt-4 flex items-center gap-2 text-sm">
          <MapPin className="size-4 shrink-0" />

          <span>{provider.serviceArea}</span>
        </div>

        <div className="border-border mt-6 border-t pt-5">
          {matchedService && (
            <>
              <p className="text-text-secondary text-xs">Matched service</p>
              <p className="text-text-primary mt-1 text-sm font-medium">
                {matchedService.title}
              </p>
            </>
          )}
          <p className="text-text-primary mt-2 text-xl font-bold">
            €{matchedPrice}
          </p>
        </div>

        <Link href={`/providers/${provider.slug}`} className="mt-6">
          <MyButton variant="secondary" fullWidth>
            View Profile
            <ArrowRight className="size-4" />
          </MyButton>
        </Link>
      </Card.Content>
    </Card>
  );
}

export default ProviderCard;
