import { z } from 'zod';

export const bookRideFormSchema = z.object({
  pickupPoint: z.string(),
  destination: z.string(),
});

export const createPlaceFormSchema = z.object({
  name: z.string(),
  alias: z.string(),
});
