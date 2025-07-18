import * as z from "zod";

export const userEmailandPassword = z.object({
  email: z.email(),
  password: z.string().refine(e => e.length > 7, {
    message: "Password must be at least 8 characters long",
  }),
  stage: z.number(),
});

export type UserEmailandPassword = z.infer<typeof userEmailandPassword>;
