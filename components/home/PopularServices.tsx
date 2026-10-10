import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { popularServices } from "@/lib/data/seed/home";
// import MyButton from "../ui/MyButton";

export function PopularServices() {
  return (
    <section className="py-20 lg:py-24">
      <div className="bg-brand-50 mx-auto max-w-7xl rounded-2xl pb-6">
        {/* Section heading */}
        <div className="bg-brand-600 flex flex-col items-center rounded-t-2xl px-6 py-6 text-center">
          {/* <p className="text-brand-600 text-sm font-semibold">
              Find the service you need
            </p> */}

          <h2 className="text-surface mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Popular Services
          </h2>

          <p className="text-brand-50 mt-4 text-center text-base leading-7">
            Explore trusted professionals across our most popular service
            categories.
          </p>
        </div>

        {/* Services */}
        <div className="mt-10 grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularServices.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.id}

                href={service.href}
              >
                <Card
                  variant="transparent"
                  className="group hover:text-brand-700 hover:bg-surface transition-color h-full text-center duration-200"
                >
                  <Card.Content className="flex h-full flex-col items-center justify-center p-6">
                    {/* Icon */}
                    <div className="text-primary flex size-12 items-center justify-center rounded-xl">
                      <Icon className="size-12" />
                    </div>
                    {/* Content */}
                    <div className="mt-6 flex-1">
                      <Card.Title className="group-hover:text-brand-700 text-lg">
                        {service.title}
                      </Card.Title>

                      <Card.Description className="mt-2 leading-6">
                        {service.description}
                      </Card.Description>
                    </div>
                    {/* Link */}
                    <div className="text-primary hover:text-primary/80 mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors">
                      Explore
                      <ArrowRight className="size-4" />
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
