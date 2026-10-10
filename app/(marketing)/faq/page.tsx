import type { Metadata } from "next";
import { Accordion } from "@heroui/react";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/data/seed/faqs";

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
      <section className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-brand-600 mt-2 text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="divide-border border-border bg-surface mt-10 divide-y rounded-2xl border">
            <Accordion variant="default" className="mt-10">
              {faqs.map((faq) => (
                <Accordion.Item key={faq.id} id={faq.id}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      {faq.question}
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
