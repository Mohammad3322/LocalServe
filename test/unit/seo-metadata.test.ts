import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildMetadata,
  clampDescription,
} from "@/lib/seo";

describe("absoluteUrl", () => {
  it("resolves a site-relative path against the site origin", () => {
    expect(absoluteUrl("/about")).toBe(`${SITE_URL}/about`);
  });

  it("adds the leading slash when it is missing", () => {
    expect(absoluteUrl("about")).toBe(`${SITE_URL}/about`);
  });

  it("returns an absolute URL, not a relative one", () => {
    expect(absoluteUrl("/providers/someone")).toMatch(/^https?:\/\//);
  });

  it("does not double the slash when the origin has a trailing one", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});

describe("buildMetadata", () => {
  const metadata = buildMetadata({
    title: "Solar Energy",
    description: "Solar panels and batteries installed by local professionals.",
    path: "/services/solar-energy",
  });

  it("uses the page's own title", () => {
    expect(metadata.title).toBe("Solar Energy");
  });

  it("uses the page's own description", () => {
    expect(metadata.description).toBe(
      "Solar panels and batteries installed by local professionals.",
    );
  });

  it("points the canonical at the page itself", () => {
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/services/solar-energy`,
    );
  });

  it("asks to be indexed by default", () => {
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("mirrors the title and description into the Open Graph card", () => {
    expect(metadata.openGraph?.title).toBe(`Solar Energy | ${SITE_NAME}`);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/services/solar-energy`);
    expect(metadata.openGraph?.siteName).toBe(SITE_NAME);
  });

  it("mirrors the copy into the Twitter card", () => {
    const twitter = metadata.twitter as { card?: string; title?: string };

    expect(twitter.title).toBe(`Solar Energy | ${SITE_NAME}`);
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(twitter.card).toBe("summary_large_image");
  });

  it("uses the default social image when the page does not supply one", () => {
    expect(metadata.openGraph?.images).toEqual([DEFAULT_OG_IMAGE]);
  });

  describe("when a page must not be indexed", () => {
    const hidden = buildMetadata({
      title: "Book an appointment",
      description: "Choose a time.",
      path: "/book/pro-1",
      index: false,
    });

    it("asks not to be indexed but still to be afollowed", () => {
      expect(hidden.robots).toEqual({ index: false, follow: false });
    });

    it("declares no canonical, so it cannot point at another page", () => {
      expect(hidden.alternates).toBeUndefined();
    });

    it("still produces a social card for a shared link", () => {
      expect(hidden.openGraph?.title).toBe(
        `Book an appointment | ${SITE_NAME}`,
      );
    });
  });

  describe("when a page is the home page", () => {
    const home = buildMetadata({
      title: "Find trusted local professionals",
      description: DEFAULT_DESCRIPTION,
      path: "/",
      absoluteTitle: true,
    });

    it("carries the site name itself", () => {
      expect(home.title).toEqual({
        absolute: `Find trusted local professionals | ${SITE_NAME}`,
      });
    });

    it("still canonicals to the origin", () => {
      expect(home.alternates?.canonical).toBe(`${SITE_URL}/`);
    });
  });

  it("gives two different pages different metadata", () => {
    const other = buildMetadata({
      title: "Security & Surveillance",
      description: "Alarms and cameras fitted by local professionals.",
      path: "/services/security-surveillance",
    });

    expect(other.title).not.toBe(metadata.title);
    expect(other.description).not.toBe(metadata.description);
    expect(other.alternates?.canonical).not.toBe(
      metadata.alternates?.canonical,
    );
  });
});

describe("clampDescription", () => {
  it("leaves a short description untouched", () => {
    expect(clampDescription("Short enough already.")).toBe(
      "Short enough already.",
    );
  });

  it("truncates a long description to the given length", () => {
    const result = clampDescription("word ".repeat(60), 100);

    expect(result.length).toBeLessThanOrEqual(101);
  });

  it("cuts on a word boundary rather than mid-word", () => {
    const result = clampDescription(
      "alpha bravo charlie delta echo foxtrot",
      20,
    );

    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toMatch(/alph…|brav…|charl…/);
  });

  it("keeps a description exactly at the limit unchanged", () => {
    const exact = "x".repeat(160);

    expect(clampDescription(exact)).toBe(exact);
  });

  it("collapses runs of whitespace, which generated copy can contain", () => {
    expect(clampDescription("Find   trusted\n\nprofessionals")).toBe(
      "Find trusted professionals",
    );
  });

  it("leaves a description without spaces intact rather than emptying it", () => {
    const result = clampDescription("x".repeat(200), 10);

    expect(result).toBe(`${"x".repeat(10)}…`);
  });
});
