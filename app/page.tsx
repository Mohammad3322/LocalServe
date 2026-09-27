import type { Metadata } from "next";

import HomePage from "./(marketing)/page";
import { DEFAULT_DESCRIPTION, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Find trusted local professionals",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
