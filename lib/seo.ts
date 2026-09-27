import type { Metadata } from "next";

/**
 * Shared SEO helpers.
 *
 * Sections 8.4 "Metadata and Social Sharing" and 8.6 "Sitemap and Robots.txt"
 * of discription.doc require every public page to carry its own title,
 * description, canonical URL and Open Graph tags, and require the transactional
 * routes to stay out of the index.
 *
 * The helpers live here rather than in each page so the title template, the
 * canonical format and the site origin are defined once. A page that needs
 * different wording passes its own copy; a page that only needs the defaults
 * calls buildMetadata with just a path.
 */

/**
 * The public origin of the site.
 *
 * NEXT_PUBLIC_SITE_URL has to be set to the real deployment origin in
 * production, because absolute URLs are what canonical tags, Open Graph images
 * and the sitemap need. It falls back to the local dev origin so a fresh clone
 * still produces valid, self-consistent tags rather than broken relative ones.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_NAME = "LocalServe";

/** Used by the home page and as the fallback description for social cards. */
export const DEFAULT_DESCRIPTION =
  "Find trusted local professionals. Compare services, check real availability " +
  "and book an appointment in minutes.";

/** The Open Graph card image, resolved against the site origin. */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/og-default.png`,
  width: 1200,
  height: 630,
  alt: "LocalServe - find trusted local professionals",
};

/** Builds an absolute URL from a site-relative path. */
export const absoluteUrl = (path: string): string => {
  const normalised = path.startsWith("/") ? path : `/${path}`;

  return `${SITE_URL}${normalised}`;
};

type BuildMetadataInput = {
  /** Page specific title, without the site name suffix. */
  title: string;
  description: string;
  /** Site-relative path of the page, used for the canonical URL. */
  path: string;
  /** Open Graph image, for pages that should not use the default card. */
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  /**
   * Whether the page may be indexed. Transactional pages pass false so they are
   * excluded from search results while still letting a crawler follow the links
   * they need to reach the rest of the site.
   */
  index?: boolean;
  /**
   * Set for the home page. The root layout's title template only applies to
   * child route segments, and the home page is the same segment as that layout,
   * so it has to supply the full title itself.
   */
  absoluteTitle?: boolean;
};

/**
 * Builds the metadata for a public page: unique title, unique description,
 * self-referencing canonical URL, Open Graph and Twitter card tags.
 */
export const buildMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  index = true,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  // The social card titles are written out in full rather than left to the root
  // layout's template, so a shared link reads correctly on its own.
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title,
    description,
    // Transactional pages must not declare a canonical at all, or they would
    // point a crawler at an unrelated indexable page.
    ...(index ? { alternates: { canonical } } : {}),
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en",
      url: canonical,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
};

/**
 * Truncates generated copy to a length search engines will display, cutting on
 * a word boundary so a description never ends mid-word.
 *
 * The provider and category descriptions are generated from templates, so
 * without this a long one would be silently truncated by the search engine
 * instead of by us.
 */
export const clampDescription = (
  text: string,
  maxLength = 160,
): string => {
  const collapsed = text.replace(/\s+/g, " ").trim();

  if (collapsed.length <= maxLength) {
    return collapsed;
  }

  const cut = collapsed.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");

  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};
