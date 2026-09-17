import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-text-primary text-xl font-bold tracking-tight"
            >
              Local<span className="text-brand-600">Serve</span>
            </Link>

            <p className="text-text-secondary mt-4 max-w-md text-sm leading-6">
              Find trusted local professionals, compare services, and book
              appointments with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-text-primary text-sm font-semibold">Explore</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/services"
                className="text-text-secondary hover:text-brand-600 text-sm"
              >
                Services
              </Link>

              <Link
                href="/search"
                className="text-text-secondary hover:text-brand-600 text-sm"
              >
                Find a Professional
              </Link>

              <Link
                href="/about"
                className="text-text-secondary hover:text-brand-600 text-sm"
              >
                About
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-text-primary text-sm font-semibold">Support</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/faq"
                className="text-text-secondary hover:text-brand-600 text-sm"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border mt-12 border-t pt-6">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} LocalServe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
