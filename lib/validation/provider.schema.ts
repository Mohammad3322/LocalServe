import { string, z } from "zod";

export const credentialSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const providerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  headline: z.string(),
  imageUrl: z.string(),

  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),

  servicesIds: z.array(string()),
  serviceArea: z.string(),
  verified: z.boolean(),

  startingPrice: z.number().nonnegative(),
  available: z.boolean(),

  description: z.string(),
  experienceYears: z.number().int().nonnegative(),

  credentials: z.array(credentialSchema),

  languages: z.array(z.string()),
});

export const providersSchema = z.array(providerSchema);

export type Credential = z.infer<typeof credentialSchema>;

export type Provider = z.infer<typeof providerSchema>;
