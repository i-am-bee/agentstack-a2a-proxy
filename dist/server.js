"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProxy = startProxy;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const node_fetch_1 = __importDefault(require("node-fetch"));
// Identity function for JSON modification (returns original data)
function identityFunction(data, port) {
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
                        variables: null,
                    },
                },
            ],
        },
        url: `http://localhost:${port}/`,
    };
}
// Function to register this server
async function registerServer(port) {
    try {
        const serverLocation = `http://localhost:${port}`;
        console.log(`Registering server at: ${serverLocation}`);
        const response = await (0, node_fetch_1.default)("http://127.0.0.1:8333/api/v1/providers?auto_remove=true", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                location: serverLocation,
            }),
        });
        if (response.ok) {
            console.log("Server registered successfully");
        }
        else {
            console.error("Failed to register server:", response.status, response.statusText);
        }
    }
    catch (error) {
        console.error("Error registering server:", error);
    }
}
// Main function to start the proxy server
async function startProxy(port, targetUrl, shouldRegister = true) {
    const app = (0, express_1.default)();
    // Middleware for parsing JSON
    app.use(express_1.default.json());
    // Intercept /.well-known/agent.json endpoint
    app.get("/.well-known/agent-card.json", async (req, res) => {
        try {
            console.log("Intercepting /.well-known/agent-card.json request");
            // Fetch the original response from target backend with timeout and retry
            const targetEndpointUrl = `${targetUrl}${req.originalUrl}`;
            console.log(`Fetching from: ${targetEndpointUrl}`);
            const response = await (0, node_fetch_1.default)(targetEndpointUrl, {
                timeout: 10000, // 10 second timeout
                headers: {
                    Connection: "close", // Force new connection
                },
            });
            if (!response.ok) {
                console.error(`Target server returned ${response.status}: ${response.statusText}`);
                return res
                    .status(response.status)
                    .json({ error: "Failed to fetch from target" });
            }
            // Parse the JSON response
            const originalData = await response.json();
            // Apply identity function (modify this function to change the JSON)
            const modifiedData = identityFunction(originalData, port);
            // Return the modified JSON
            res.json(modifiedData);
        }
        catch (error) {
            console.error("Error processing /.well-known/agent.json:", error);
            console.error("Target URL was:", `${targetUrl}${req.originalUrl}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    // Proxy all other requests to the target backend
    app.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: targetUrl,
        changeOrigin: true,
        onError: (err, req, res) => {
            console.error("Proxy error:", err);
            res.status(500).json({ error: "Proxy error" });
        },
    }));
    // Start the server
    return new Promise((resolve, reject) => {
        const server = app.listen(port, async () => {
            console.log(`Proxy server running on port ${port}`);
            console.log(`Proxying requests to: ${targetUrl}`);
            console.log(`Intercepting: /.well-known/agent-card.json`);
            // Register the server after it starts (if enabled)
            if (shouldRegister) {
                await registerServer(port);
            }
            resolve();
        });
        server.on("error", (error) => {
            reject(error);
        });
    });
}
//# sourceMappingURL=server.js.map