import type { Provider } from "@/lib/validation/provider.schema";

import { BookingDateTime } from "./BookingDateTime";
import { BookingProgress } from "./BookingProgress";

type BookingPageProps = {
  provider: Provider;
  selectedServiceId?: string;
};

export function BookingPage({ provider, selectedServiceId }: BookingPageProps) {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BookingProgress currentStep={2} />

        <BookingDateTime
          provider={provider}
          selectedServiceId={selectedServiceId}
        />
      </div>
    </main>
  );
}
