import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@heroui/react";

import { faqs } from "@/lib/data/seed/faqs";

export function FaqPreview() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-brand-600 mt-2 text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-border border-border bg-surface mt-10 divide-y rounded-2xl border">
          <Accordion variant="default" className="mt-10">
            {faqs.map((faq, i) => {
              if (i < 4)
                return (
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
                );
            })}
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
          >
            View all FAQs
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
