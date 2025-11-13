"use strict";
/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliInputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.cliInputSchema = zod_1.default.object({
    platformUrl: zod_1.default.string().optional().default("http://127.0.0.1:8333"),
    selfRegistrationId: zod_1.default.string().optional().default("a2a-proxy-agent"),
    autoRegister: zod_1.default
        .string()
        .transform((val) => {
        if (val === "true" || val === "1")
            return true;
        if (val === "false" || val === "0")
            return false;
        throw new Error("autoRegister must be 'true', 'false', '1', or '0'");
    })
        .optional()
        .default(true),
    port: zod_1.default
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
    customData: zod_1.default.string().optional(),
});
//# sourceMappingURL=cli-config.js.map