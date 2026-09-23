import Link from "next/link";
import { Search } from "lucide-react";
import MyButton from "../ui/MyButton";

export function ServiceCategoryCTA() {
  return (
    <section className="bg-brand-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to find a professional?
          </h2>

          <p className="mt-4 text-base leading-7 text-white/80">
            Compare local professionals, check availability, and book the
            service you need.
          </p>

          <div className="mt-8">
            <Link href="/search">
              <MyButton variant="secondary" size="lg">
                <Search className="size-4" />
                Find Providers
              </MyButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
