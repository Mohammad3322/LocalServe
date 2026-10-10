import MyButton from "@/components/ui/MyButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="bg-brand-50 mx-auto flex size-20 items-center justify-center rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            className="text-brand-600 size-10"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.17 9.17a4 4 0 0 1 5.66 5.66M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42m-9.88 9.88-1.42 1.42"
            />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>

        <p className="text-brand-600 mt-8 text-sm font-semibold tracking-widest">
          ERROR 404
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          This Provider not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
          Sorry, we couldn&apos;t find this provider you&apos;re looking for. It
          may have been removed or the link may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/">
            <MyButton variant="primary">Back to Home</MyButton>
          </Link>

          <Link href="/search">
            <MyButton variant="secondary">Search Providers</MyButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
