import { z } from "zod";

export const staffSchema = z.object({
  staff_pass_id: z.string(),
  team_name: z.string(),
  createdAt: z.string(),
});

export const redeemedSchema = z.object({
  team_name: z.string(),
  redeemed_at: z.string(),
  redeemed_by: z.string(),
});

export type Staff = z.infer<typeof staffSchema>;
export type Redeemed = z.infer<typeof redeemedSchema>;
