/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import z from "zod";

export const cliInputSchema = z.object({
  platformUrl: z.string().optional().default("http://127.0.0.1:8333"),
  selfRegistrationId: z.string().optional().default("a2a-proxy-agent"),
  autoRegister: z
    .string()
    .transform((val) => {
      if (val === "true" || val === "1") return true;
      if (val === "false" || val === "0") return false;
      throw new Error("autoRegister must be 'true', 'false', '1', or '0'");
    })
    .optional()
    .default(true),
  port: z
    .string()
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 65535) {
        throw new Error("port must be a number between 1 and 65535");
      }
      return num;
    })
    .optional()
    .default(8000),
  customData: z.string().optional(),
});
export type CliInput = z.infer<typeof cliInputSchema>;
