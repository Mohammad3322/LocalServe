import { z } from "zod";

export const servicesSetchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
});

export const keyServicesSchema = z.array(servicesSetchema);

export type ServicesSet = z.infer<typeof servicesSetchema>;
