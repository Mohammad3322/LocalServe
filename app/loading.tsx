import { Spinner } from "@/components/ui/Spinner";
export default function Loading() {
  return (
    <main
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <Spinner />

      <div className="text-center">
        <h1 className="text-lg font-semibold text-slate-900">
          Loading LocalServe
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we prepare everything for you.
        </p>
      </div>
    </main>
  );
}
