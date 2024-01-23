import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  image: z.string().optional(),
  typeActivite: z.string().optional(),
});

export const TypeActiviteEnums = [
  { type: "commerciales", plafond: 188700 },
  { type: "service", plafond: 77700 },
];

export type TypeActivite = "service" | "commerciales";
