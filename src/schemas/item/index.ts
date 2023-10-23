import { z } from 'zod';

import { CURRENCY } from '@src/constants/currency';

export const itemSchema = z.object({
    name: z.string(),
    brand: z.string(),
    price: z.number().min(0),
    image: z.string(),
    url: z.string().url(),
    description: z.string().min(0).max(512),
    currency: z.enum(CURRENCY),
});

export type ItemSchema = z.infer<typeof itemSchema>;
