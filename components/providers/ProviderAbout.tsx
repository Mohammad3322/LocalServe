import { Award, BriefcaseBusiness, Languages } from "lucide-react";

import type { Provider } from "@/lib/validation/provider.schema";

type ProviderAboutProps = {
  provider: Provider;
};

export function ProviderAbout({ provider }: ProviderAboutProps) {
  return (
    <section id="about" className="border-border border-b py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div>
          <h2 className="text-text-primary text-2xl font-semibold">About</h2>

          <p className="text-text-secondary mt-4 max-w-3xl text-base leading-7">
            {provider.description}
          </p>

          {/* Credentials */}
          <div className="mt-10">
            <div className="flex items-center gap-2">
              <Award className="text-brand-600 size-5" />

              <h3 className="text-text-primary text-lg font-semibold">
                Credentials
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {provider.credentials.map((credential) => (
                <div
                  key={credential.title}
                  className="border-border bg-surface rounded-xl border p-5"
                >
                  <h4 className="text-text-primary font-medium">
                    {credential.title}
                  </h4>

                  <p className="text-text-secondary mt-1 text-sm leading-6">
                    {credential.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Provider Details */}
        <aside className="space-y-4">
          {/* Experience */}
          <div className="border-border bg-surface rounded-xl border p-5">
            <div className="flex items-start gap-3">
              <div className="bg-brand-50 text-brand-600 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <BriefcaseBusiness className="size-5" />
              </div>

              <div>
                <p className="text-text-secondary text-sm">Experience</p>

                <p className="text-text-primary mt-1 font-semibold">
                  {provider.experienceYears} years
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          {provider.languages.length > 0 && (
            <div className="border-border bg-surface rounded-xl border p-5">
              <div className="flex items-start gap-3">
                <div className="bg-brand-50 text-brand-600 flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Languages className="size-5" />
                </div>

                <div>
                  <p className="text-text-secondary text-sm">Languages</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {provider.languages.map((language) => (
                      <span
                        key={language}
                        className="bg-background text-text-primary rounded-full px-3 py-1 text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
