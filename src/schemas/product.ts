import { z } from 'zod';

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  inStock: z.boolean(),
});

export type ProductInput = z.infer<typeof productSchema>;
