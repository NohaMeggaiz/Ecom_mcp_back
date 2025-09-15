import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  category: z.string().min(1),
   imageUrl: z.string().url().optional() ,
    inStock: z.boolean().optional()
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
