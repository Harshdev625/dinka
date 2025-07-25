import * as z from "zod";


export const ViewersEnum = z.enum(["Public", "Followers"]);
export const userEmailandPassword = z.object({
  email: z.email(),
  password: z.string().refine(e => e.length > 7, {
    message: "Password must be at least 8 characters long",
  }),
  stage: z.number(),
});

export type UserEmailandPassword = z.infer<typeof userEmailandPassword>;
export const PostSchema = z.object({
  id: z.number().int(),                       // Int @id @default(autoincrement())
  title: z.string(),                          // String
  visiblity: ViewersEnum.default("Public"),  // Viewers enum with default
  authorId: z.string(),
  likes: z.number(),       
  author: z.object({
    name: z.string()
  }),                       // String (FK to User)
  isMedia: z.boolean(),                       // Boolean
  mediaurl: z.string().nullable().optional(), // String? => nullable
  createdAt: z.string(),  
  isLiked: z.boolean(),               // DateTime @default(now())

  // Related fields (not for validation input, useful for output shape)
        // User[]
    // Comment[]
   // Notification[]
  seenBy: z.array(z.any()).optional(),        // SeenPost[]
});
export type PostType = z.infer<typeof PostSchema>