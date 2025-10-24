#!/usr/bin/env node

console.log("Starting beeai-a2a-proxy...");

import { Command } from "commander";
import { startProxy } from "./server";

const program = new Command();

program
  .name("beeai-a2a-proxy")
  .description("A2A proxy server with endpoint interception")
  .version("1.0.0");

program
  .command("start")
  .description("Start the proxy server")
  .option("-p, --port <port>", "Port to run the proxy server on", "3000")
  .option("-r, --required-variables <variables...>", "Required variables", [])
  .option(
    "-t, --target <url>",
    "Target URL to proxy to",
    "http://localhost:10001"
  )
  .action(async (options) => {
    const port = parseInt(options.port);
    const targetUrl = options.target;

    if (isNaN(port) || port < 1 || port > 65535) {
      console.error("Error: Port must be a number between 1 and 65535");
      process.exit(1);
    }

    try {
      await startProxy(port, targetUrl, {
        requiredVariables: options.requiredVariables,
      });
    } catch (error) {
      console.error("Failed to start proxy server:", error);
      process.exit(1);
    }
  });

program.parse();
