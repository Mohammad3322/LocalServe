import { Button } from "@heroui/react";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-brand-600 overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find the right professional?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Search local services, compare professionals and choose an
            appointment that works for you.
          </p>

          <Link href="/search">
            <Button
              variant="primary"
              size="lg"
              style={{ color: "--color-brand-500" }}
            >
              Find a Professional
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
