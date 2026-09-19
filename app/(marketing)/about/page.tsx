import { HomeCta } from "@/components/home/HomeCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <section id="how-it-works" className="py-20 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              About LocalServe
            </h2>

            <p className="text-text-secondary mt-4 text-base leading-7">
              LocalServe helps people discover local professionals, compare
              services, check availability, and book appointments in one simple
              experience.
            </p>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What is LocalServe?
            </h2>
            <div className="mt-4 flex items-start gap-10">
              <Image
                src="/Logo/LogoWithBrandName.svg"
                alt=""
                width={300}
                height={300}
              />
              <div className="">
                <p className="text-text-secondary mt-4 text-start text-base leading-7">
                  LocalServe is a local professional services discovery and
                  appointment booking platform.
                </p>
                <p className="text-text-secondary mt-4 text-start text-base leading-7">
                  It gives customers a clear way to find relevant services,
                  explore professionals, understand pricing and availability,
                  and request an appointment.
                </p>
              </div>
            </div>
            <HowItWorks />
            <HomeCta />
          </div>

          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="bg-brand-100 absolute top-12 right-[16.66%] left-[16.66%] hidden h-px lg:block"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
