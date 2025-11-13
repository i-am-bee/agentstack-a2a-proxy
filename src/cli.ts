#!/usr/bin/env node
/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Command } from "commander";
import { startProxy } from "./server";
import z from "zod";
import { loadCustomAgentDetail } from "./input/load-custom-agent-detail";
import { cliInputSchema } from "./validations/cli-config";

const program = new Command();

program
  .name("agentstack-a2a-proxy")
  .description("Agent Stack A2A Proxy")
  .version("1.0.0");

program
  .command("start <target>")
  .description("Start the proxy server")
  .option(
    "-s, --self-registration-id <selfRegistrationId>",
    "Self registration ID to use for registration (default: a2a-proxy-agent)"
  )
  .option(
    "-a --auto-register <autoRegister>",
    "Register with the provider API",
    "true"
  )
  .option(
    "-p, --port <port>",
    "Port to run the proxy server on (default: 8000)"
  )
  .option(
    "-P, --platform-url <platformUrl>",
    "Platform URL to register with (default: http://127.0.0.1:8333)"
  )
  .option("-c, --custom-data <file>", "Path to custom agent detail JSON file")
  .action(async (target, options) => {
    const parsedTarget = z.url().parse(target);
    const parsedInput = cliInputSchema.parse(options);

    try {
      let customData;
      if (parsedInput.customData) {
        customData = loadCustomAgentDetail(parsedInput.customData);
      }

      await startProxy({
        autoRegister: parsedInput.autoRegister,
        port: parsedInput.port,
        targetUrl: parsedTarget,
        platformUrl: parsedInput.platformUrl,
        customData,
        selfRegistrationId: parsedInput.selfRegistrationId,
      });
    } catch (error) {
      console.error("Failed to start proxy server:", error);
      process.exit(1);
    }
  });

program.parse();
