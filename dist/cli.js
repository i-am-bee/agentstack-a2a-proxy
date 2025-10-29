#!/usr/bin/env node
/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = require("./server");
const zod_1 = __importDefault(require("zod"));
const load_custom_agent_detail_1 = require("./input/load-custom-agent-detail");
const cli_config_1 = require("./validations/cli-config");
const program = new commander_1.Command();
program
    .name("agentstack-a2a-proxy")
    .description("Agent Stack A2A Proxy")
    .version("1.0.0");
program
    .command("start <target>")
    .description("Start the proxy server")
    .option("-a --auto-register <autoRegister>", "Register with the provider API", "true")
    .option("-p, --port <port>", "Port to run the proxy server on (default: 8000)")
    .option("-P, --platform-url <platformUrl>", "Platform URL to register with (default: http://127.0.0.1:8333)")
    .option("-c, --custom-data <file>", "Path to custom agent detail JSON file")
    .action(async (target, options) => {
    const parsedTarget = zod_1.default.url().parse(target);
    const parsedInput = cli_config_1.cliInputSchema.parse(options);
    try {
        let customData;
        if (parsedInput.customData) {
            customData = (0, load_custom_agent_detail_1.loadCustomAgentDetail)(parsedInput.customData);
        }
        await (0, server_1.startProxy)({
            autoRegister: parsedInput.autoRegister,
            port: parsedInput.port,
            targetUrl: parsedTarget,
            platformUrl: parsedInput.platformUrl,
            customData,
        });
    }
    catch (error) {
        console.error("Failed to start proxy server:", error);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map