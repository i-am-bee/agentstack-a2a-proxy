import z from "zod";

const contributorSchema = z.object({
  name: z.string(),
  email: z.string().nullable(),
  url: z.string().nullable(),
});
const toolSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const interactionModeSchema = z.enum(["single-turn", "multi-turn"]);

export const customAgentDetailSchema = z
  .object({
    interaction_mode: z.union([interactionModeSchema, z.string()]).nullable(),
    user_greeting: z.string().nullable(),
    input_placeholder: z.string().nullable(),
    tools: z.array(toolSchema).nullable(),
    framework: z.string().nullable(),
    license: z.string().nullable(),
    programming_language: z.string().nullable(),
    homepage_url: z.url().nullable(),
    source_code_url: z.url().nullable(),
    container_image_url: z.url().nullable(),
    author: contributorSchema.nullable(),
    contributors: z.array(contributorSchema).nullable(),
  })
  .partial();

export type CustomAgentDetail = z.infer<typeof customAgentDetailSchema>;
