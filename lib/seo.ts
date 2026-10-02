import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_NAME = "LocalServe";

export const DEFAULT_DESCRIPTION =
  "Find trusted local professionals. Compare services, check real availability " +
  "and book an appointment in minutes.";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/Logo/Vector.svg`,
  width: 1200,
  height: 630,
  alt: "LocalServe - find trusted local professionals",
};

export const absoluteUrl = (path: string): string => {
  const normalised = path.startsWith("/") ? path : `/${path}`;

  return `${SITE_URL}${normalised}`;
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };

  index?: boolean;

  absoluteTitle?: boolean;
};

export const buildMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  index = true,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title,
    description,
    ...(index ? { alternates: { canonical } } : {}),
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
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

export const clampDescription = (text: string, maxLength = 160): string => {
  const collapsed = text.replace(/\s+/g, " ").trim();

  if (collapsed.length <= maxLength) {
    return collapsed;
  }

  const cut = collapsed.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");

  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};
