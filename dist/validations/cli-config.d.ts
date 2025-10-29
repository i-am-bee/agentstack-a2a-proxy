/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import z from "zod";
export declare const cliInputSchema: z.ZodObject<{
    platformUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    autoRegister: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>>>;
    port: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>>;
    customData: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CliInput = z.infer<typeof cliInputSchema>;
//# sourceMappingURL=cli-config.d.ts.map