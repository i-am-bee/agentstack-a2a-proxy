/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import z from "zod";
export declare const interactionModeSchema: z.ZodEnum<{
    "single-turn": "single-turn";
    "multi-turn": "multi-turn";
}>;
export declare const customAgentDetailSchema: z.ZodObject<{
    interaction_mode: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodEnum<{
        "single-turn": "single-turn";
        "multi-turn": "multi-turn";
    }>, z.ZodString]>>>;
    user_greeting: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    input_placeholder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tools: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>>>>;
    framework: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    license: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    programming_language: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    homepage_url: z.ZodOptional<z.ZodNullable<z.ZodURL>>;
    source_code_url: z.ZodOptional<z.ZodNullable<z.ZodURL>>;
    container_image_url: z.ZodOptional<z.ZodNullable<z.ZodURL>>;
    author: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        url: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
    contributors: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        url: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type CustomAgentDetail = z.infer<typeof customAgentDetailSchema>;
//# sourceMappingURL=custom-agent-detail-schema.d.ts.map