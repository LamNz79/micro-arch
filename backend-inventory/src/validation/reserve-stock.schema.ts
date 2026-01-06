import { z } from 'zod';

export const ReserveStockSchema = z.object({
    productId: z.guid(),
    quantity: z.number().int().positive(),
});

export type ReserveStockDto = z.infer<typeof ReserveStockSchema>;
