import type { Metadata } from "next";
import { FaqPreview } from "@/components/home/FaqPreview";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently asked questions",
  description:
    "Answers about booking on LocalServe: how availability works, what happens " +
    "if a slot is taken, and how to change or cancel an appointment.",
  path: "/faq",
});

const Page = () => {
  return (
    <div>
      <FaqPreview />
    </div>
  );
};

export default Page;
