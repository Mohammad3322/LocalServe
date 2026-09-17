import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { featuredProviders } from "@/lib/data/seed/providers";
import { Avatar, Card, Chip } from "@heroui/react";

export function FeaturedProviders() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-brand-600 text-sm font-semibold">
              Featured professionals
            </p>

            <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
              Trusted providers
            </h2>

            <p className="text-text-secondary mt-3 max-w-2xl">
              Explore professionals with strong ratings and clear service
              information.
            </p>
          </div>

          <Link
            href="/search"
            className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Explore providers
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProviders.map((provider) => (
            <Card key={provider.id} className="border-border bg-surface border">
              <Card.Content className="p-0">
                <Image
                  src={provider.imageUrl}
                  alt={`${provider.name} professional`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image
                          src={provider.imageUrl}
                          alt={provider.name}
                        />

                        <Avatar.Fallback>ST</Avatar.Fallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>

                        <p className="text-text-secondary text-sm">
                          {provider.headline}
                        </p>
                      </div>
                    </div>

                    {provider.verified && (
                      <Chip color="success" variant="primary" size="sm">
                        Verified
                      </Chip>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <span
                      className="text-text-secondary inline-flex items-center gap-1.5"
                      aria-label={`${provider.rating} out of 5 stars from ${provider.reviewCount} reviews`}
                    >
                      <Star className="size-4 fill-current text-amber-500" />
                      {provider.rating}
                      <span className="text-text-muted">
                        ({provider.reviewCount})
                      </span>
                    </span>

                    <span className="text-text-secondary inline-flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {provider.serviceArea}
                    </span>
                  </div>

                  <div className="border-border mt-5 flex items-center justify-between border-t pt-5">
                    <div>
                      <p className="text-text-muted text-xs">Starting from</p>
                      <p className="text-text-primary mt-1 font-semibold">
                        €{provider.startingPrice}
                      </p>
                    </div>

                    <Link
                      href={`/providers/${provider.slug}`}
                      className="border-border text-text-primary hover:border-brand-300 hover:text-brand-600 rounded-lg border px-4 py-2 text-sm font-semibold"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </Card.Content>
            </Card>
            // <article
            //   key={provider.id}
            //   className="border-border bg-surface overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
            // >
            //   <div className="bg-background relative aspect-video">
            //     <Image
            //       src={provider.imageUrl}
            //       alt={`${provider.name} professional`}
            //       fill
            //       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            //       className="object-cover"
            //     />
            //   </div>

            //   <div className="p-6">
            //     <div className="flex items-start justify-between gap-4">
            //       <div>
            //         <div className="flex items-center gap-2">
            //           <h3 className="text-text-primary font-semibold">
            //             {provider.name}
            //           </h3>

            //           {provider.verified && (
            //             <BadgeCheck
            //               aria-label="Verified provider"
            //               className="text-brand-600 size-4"
            //             />
            //           )}
            //         </div>

            //         <p className="text-text-secondary mt-1 text-sm">
            //           {provider.headline}
            //         </p>
            //       </div>
            //     </div>

            //     <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            //       <span
            //         className="text-text-secondary inline-flex items-center gap-1.5"
            //         aria-label={`${provider.rating} out of 5 stars from ${provider.reviewCount} reviews`}
            //       >
            //         <Star className="size-4 fill-current text-amber-500" />
            //         {provider.rating}
            //         <span className="text-text-muted">
            //           ({provider.reviewCount})
            //         </span>
            //       </span>

            //       <span className="text-text-secondary inline-flex items-center gap-1.5">
            //         <MapPin className="size-4" />
            //         {provider.serviceArea}
            //       </span>
            //     </div>

            //     <div className="border-border mt-5 flex items-center justify-between border-t pt-5">
            //       <div>
            //         <p className="text-text-muted text-xs">Starting from</p>
            //         <p className="text-text-primary mt-1 font-semibold">
            //           €{provider.startingPrice}
            //         </p>
            //       </div>

            //       <Link
            //         href={`/providers/${provider.slug}`}
            //         className="border-border text-text-primary hover:border-brand-300 hover:text-brand-600 rounded-lg border px-4 py-2 text-sm font-semibold"
            //       >
            //         View Profile
            //       </Link>
            //     </div>
            //   </div>
            // </article>
          ))}
        </div>
      </div>
    </section>
  );
}
