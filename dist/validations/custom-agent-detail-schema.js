/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAgentDetailSchema = exports.interactionModeSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const contributorSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().nullable(),
    url: zod_1.default.string().nullable(),
});
const toolSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
});
exports.interactionModeSchema = zod_1.default.enum(["single-turn", "multi-turn"]);
exports.customAgentDetailSchema = zod_1.default
    .object({
    interaction_mode: zod_1.default.union([exports.interactionModeSchema, zod_1.default.string()]).nullable(),
    user_greeting: zod_1.default.string().nullable(),
    input_placeholder: zod_1.default.string().nullable(),
    tools: zod_1.default.array(toolSchema).nullable(),
    framework: zod_1.default.string().nullable(),
    license: zod_1.default.string().nullable(),
    programming_language: zod_1.default.string().nullable(),
    homepage_url: zod_1.default.url().nullable(),
    source_code_url: zod_1.default.url().nullable(),
    container_image_url: zod_1.default.url().nullable(),
    author: contributorSchema.nullable(),
    contributors: zod_1.default.array(contributorSchema).nullable(),
})
    .partial();
//# sourceMappingURL=custom-agent-detail-schema.js.map