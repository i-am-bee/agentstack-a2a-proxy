#!/usr/bin/env tsx

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
  .option(
    "-t, --target <url>",
    "Target URL to proxy to",
    "http://localhost:10001"
  )
  .option("--no-register", "Skip auto-registration with the provider API")
  .action(async (options) => {
    const port = parseInt(options.port);
    const targetUrl = options.target;
    const shouldRegister = options.register;

    if (isNaN(port) || port < 1 || port > 65535) {
      console.error("Error: Port must be a number between 1 and 65535");
      process.exit(1);
    }

    try {
      await startProxy(port, targetUrl, shouldRegister);
    } catch (error) {
      console.error("Failed to start proxy server:", error);
      process.exit(1);
    }
  });

// Add default action when no command is provided
program.action(async () => {
  console.log("Starting beeai-a2a-proxy with default settings...");
  console.log("Use 'beeai-a2a-proxy start --help' for more options");

  try {
    await startProxy(3000, "http://localhost:10001", true);
  } catch (error) {
    console.error("Failed to start proxy server:", error);
    process.exit(1);
  }
});

program.parse();
