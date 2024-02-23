import { z } from "zod";

export const staffSchema = z.object({
  staff_pass_id: z.string(),
  team_name: z.string(),
  createdAt: z.string(),
});

export type Staff = z.infer<typeof staffSchema>;
