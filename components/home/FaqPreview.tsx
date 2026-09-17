import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@heroui/react";

const faqs = [
  {
    id: "find-service",

    question: "How do I find the right service?",
    answer:
      "Start by selecting a service and location, then compare available professionals.",
  },
  {
    id: "compare-providers",
    question: "Can I compare different professionals?",
    answer:
      "Yes. You can review provider information, services, ratings, pricing and availability.",
  },
  {
    id: "booking",
    question: "How does booking work?",
    answer:
      "Select a provider and service, choose an available date and time, enter your details, and confirm your appointment.",
  },
  {
    id: "availability",
    question: "What if there is no available time?",
    answer:
      "You can check other dates or choose another professional with available appointments.",
  },
];

export function FaqPreview() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-brand-600 text-sm font-semibold">
            Need to know more?
          </p>

          <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
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
