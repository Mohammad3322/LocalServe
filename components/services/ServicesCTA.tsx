import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MyButton from "../ui/MyButton";

export function ServicesCTA() {
  return (
    <section className="bg-brand-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to find a professional?
            </h2>

            <p className="mt-3 text-base leading-7 text-white/80">
              Search local services, compare professionals, and book your
              appointment with LocalServe.
            </p>
          </div>

          <Link href="/search" className="shrink-0">
            <MyButton
              variant="secondary"
              size="lg"
              className="w-full md:w-auto"
            >
              Find a Professional
              <ArrowRight className="size-4" />
            </MyButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
