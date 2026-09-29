import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { metadata as bookLayoutMetadata } from "@/app/book/layout";
import { metadata as bookingLayoutMetadata } from "@/app/booking/layout";
import { metadata as rootMetadata } from "@/app/layout";
import { providers } from "@/lib/data/seed/providers";
import { serviceCategories } from "@/lib/data/seed/categories";
import { SITE_URL } from "@/lib/seo";

const urls = () => sitemap().map((entry) => entry.url);

describe("sitemap", () => {
  it("lists the home page", () => {
    expect(urls()).toContain(`${SITE_URL}/`);
  });

  it("lists the main marketing pages", () => {
    for (const path of ["/about", "/faq", "/services"]) {
      expect(urls()).toContain(`${SITE_URL}${path}`);
    }
  });

  it("lists every service category", () => {
    for (const category of serviceCategories) {
      expect(urls()).toContain(`${SITE_URL}/services/${category.slug}`);
    }
  });

  it("lists every provider profile by its public slug", () => {
    const listed = urls();

    for (const provider of providers) {
      expect(listed).toContain(`${SITE_URL}/providers/${provider.slug}`);
    }
  });

  it("does not list the booking or confirmation routes", () => {
    for (const url of urls()) {
      expect(url).not.toContain("/book/");
      expect(url).not.toContain("/booking/");
    }
  });

  it("does not list the search results page", () => {
    for (const url of urls()) {
      expect(url).not.toContain("/search");
    }
  });

  it("does not list an API route", () => {
    for (const url of urls()) {
      expect(url).not.toContain("/api/");
    }
  });

  it("returns only absolute URLs", () => {
    for (const url of urls()) {
      expect(url.startsWith("http")).toBe(true);
    }
  });

  it("lists every URL exactly once", () => {
    const listed = urls();

    expect(new Set(listed).size).toBe(listed.length);
  });

  it("marks a provider profile as worth re-crawling, because availability changes", () => {
    const entry = sitemap().find((item) =>
      item.url.includes(`/providers/${providers[0].slug}`),
    );

    expect(entry?.changeFrequency).toBe("daily");
  });
});

describe("robots", () => {
  const firstRule = () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];

    return list[0];
  };

  const blockedPaths = () => {
    const disallowed = firstRule().disallow;

    return Array.isArray(disallowed) ? disallowed : [disallowed];
  };

  it("allows crawling by default so provider profiles are discovered", () => {
    expect(firstRule().userAgent).toBe("*");
    expect(firstRule().allow).toBe("/");
  });

  it("blocks the booking wizard and the confirmation page", () => {
    expect(blockedPaths()).toContain("/book/");
    expect(blockedPaths()).toContain("/booking/");
  });

  it("blocks the API", () => {
    expect(blockedPaths()).toContain("/api/");
  });

  it("advertises the sitemap as an absolute URL", () => {
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("declares the site host", () => {
    expect(robots().host).toBe(`${SITE_URL}/`);
  });
});

describe("crawl rules on the transactional routes", () => {
  it("asks not to index the booking steps", () => {
    expect(bookLayoutMetadata.robots).toEqual({ index: false, follow: true });
  });

  it("asks not to index or follow the confirmation page", () => {
    expect(bookingLayoutMetadata.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});

describe("root layout metadata", () => {
  it("templates the title so a page only has to describe itself", () => {
    expect(rootMetadata.title).toEqual({
      default: "LocalServe",
      template: "%s | LocalServe",
    });
  });

  it("sets the base URL the per-page canonical tags resolve against", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(`${SITE_URL}/`);
  });

  it("declares no canonical, so a noindex page cannot inherit one", () => {
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
  });
});
