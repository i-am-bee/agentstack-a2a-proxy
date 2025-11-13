/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import fetch from "node-fetch";
import { CustomAgentDetail } from "./validations/custom-agent-detail-schema";
import { CliInput } from "./validations/cli-config";
import { registerToPlatform } from "./core/register-to-platform";
import { interceptAgentCard } from "./core/intercept-agent-card";

export async function startProxy(
  input: Pick<CliInput, "autoRegister" | "port"> & {
    platformUrl: string;
    targetUrl: string;
    selfRegistrationId: string;
  } & Partial<{ customData: CustomAgentDetail }>
): Promise<void> {
  const app = express();
  app.use(express.json());

  app.get("/.well-known/agent-card.json", async (req, res) => {
    try {
      console.debug("Intercepting /.well-known/agent-card.json request");
      const targetEndpointUrl = `${input.targetUrl}${req.originalUrl}`;
      console.debug(`Fetching from: ${targetEndpointUrl}`);

      const response = await fetch(targetEndpointUrl, {
        timeout: 10000,
        headers: {
          Connection: "close",
        },
      });

      if (!response.ok) {
        console.error(
          `Target server returned ${response.status}: ${response.statusText}`
        );
        return res
          .status(response.status)
          .json({ error: "Failed to fetch from target" });
      }

      const originalData = await response.json();
      const modifiedData = interceptAgentCard(
        originalData,
        input.port,
        input.selfRegistrationId,
        input.customData
      );

      res.json(modifiedData);
    } catch (error) {
      console.error("Error processing /.well-known/agent.json:", error);
      console.error("Target URL was:", `${input.targetUrl}${req.originalUrl}`);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.use(
    "/",
    createProxyMiddleware({
      target: input.targetUrl,
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Proxy error" });
      },
    })
  );

  return new Promise((resolve, reject) => {
    const server = app.listen(input.port, async () => {
      console.log(`Proxy server running on port ${input.port}`);
      console.log(`Proxying requests to: ${input.targetUrl}`);
      console.log(`Intercepting: /.well-known/agent-card.json`);

      if (input.autoRegister) {
        await registerToPlatform(
          input.platformUrl,
          `http://localhost:${input.port}`,
          input.selfRegistrationId
        );
      }

      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });
}
