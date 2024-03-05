import { z } from 'zod';

export const bookRideFormSchema = z.object({
  pickupPoint: z.string(),
  destination: z.string(),
});
