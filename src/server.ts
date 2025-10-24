import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import fetch from "node-fetch";

// Identity function for JSON modification (returns original data)
function identityFunction(config: Config, data: any, port: number): any {
  return {
    ...data,
    capabilities: {
      ...data.capabilities,
      extensions: [
        {
          uri: "https://a2a-extensions.beeai.dev/ui/agent-detail/v1",
          required: false,
          params: {
            author: null,
            container_image_url: null,
            contributors: [],
            framework: null,
            interaction_mode: "multi-turn",
            variables: [
              ...config.requiredVariables.map((variable) => ({
                name: variable,
                description: variable,
                required: true,
              })),
            ],
          },
        },
      ],
    },
    url: `http://localhost:${port}/`,
  };
}

interface Config {
  requiredVariables: string[];
}

// Main function to start the proxy server
export async function startProxy(
  port: number,
  targetUrl: string,
  config: Config
): Promise<void> {
  const app = express();

  // Middleware for parsing JSON
  app.use(express.json());

  // Intercept /.well-known/agent.json endpoint
  app.get("/.well-known/agent-card.json", async (req, res) => {
    try {
      console.log("Intercepting /.well-known/agent-card.json request");

      // Fetch the original response from target backend with timeout and retry
      const targetEndpointUrl = `${targetUrl}${req.originalUrl}`;
      console.log(`Fetching from: ${targetEndpointUrl}`);

      const response = await fetch(targetEndpointUrl, {
        timeout: 10000, // 10 second timeout
        headers: {
          Connection: "close", // Force new connection
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

      // Parse the JSON response
      const originalData = await response.json();

      // Apply identity function (modify this function to change the JSON)
      const modifiedData = identityFunction(config, originalData, port);

      // Return the modified JSON
      res.json(modifiedData);
    } catch (error) {
      console.error("Error processing /.well-known/agent.json:", error);
      console.error("Target URL was:", `${targetUrl}${req.originalUrl}`);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.use(
    "/",
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Proxy error" });
      },
    })
  );

  return new Promise((resolve, reject) => {
    const server = app.listen(port, async () => {
      console.log(`Proxy server running on port ${port}`);
      console.log(`Proxying requests to: ${targetUrl}`);
      console.log(`Intercepting: /.well-known/agent-card.json`);

      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });
}
