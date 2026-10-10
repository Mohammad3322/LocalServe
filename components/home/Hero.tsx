// import { CheckCircle2 } from "lucide-react";
import { HomeSearch } from "@/components/home/HomeSearch";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate min-h-155">
      <Image
        src="/images/hero/Background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right md:object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/45" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-10">
        <div className="mx-auto flex w-full flex-col gap-5 text-center md:gap-18">
          {/* <div className="border-border bg-surface text-text-secondary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
            <CheckCircle2 className="text-brand-600 size-4" />
            Trusted local professionals
          </div> */}

          <div className="bg-brand-600-tr self-start rounded-4xl rounded-br-none p-5">
            <h1 className="text-surface text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find trusted professionals
            </h1>

            <p className="text-brand-50 mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg">
              Discover local professionals, compare their services, and book the
              right appointment for your needs.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <HomeSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
