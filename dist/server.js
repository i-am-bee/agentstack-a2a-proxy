"use strict";
/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProxy = startProxy;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const node_fetch_1 = __importDefault(require("node-fetch"));
const register_to_platform_1 = require("./core/register-to-platform");
const intercept_agent_card_1 = require("./core/intercept-agent-card");
async function startProxy(input) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/.well-known/agent-card.json", async (req, res) => {
        try {
            console.debug("Intercepting /.well-known/agent-card.json request");
            const targetEndpointUrl = `${input.targetUrl}${req.originalUrl}`;
            console.debug(`Fetching from: ${targetEndpointUrl}`);
            const response = await (0, node_fetch_1.default)(targetEndpointUrl, {
                timeout: 10000,
                headers: {
                    Connection: "close",
                },
            });
            if (!response.ok) {
                console.error(`Target server returned ${response.status}: ${response.statusText}`);
                return res
                    .status(response.status)
                    .json({ error: "Failed to fetch from target" });
            }
            const originalData = await response.json();
            const modifiedData = (0, intercept_agent_card_1.interceptAgentCard)(originalData, input.port, input.selfRegistrationId, input.customData);
            res.json(modifiedData);
        }
        catch (error) {
            console.error("Error processing /.well-known/agent.json:", error);
            console.error("Target URL was:", `${input.targetUrl}${req.originalUrl}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    app.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: input.targetUrl,
        changeOrigin: true,
        onError: (err, req, res) => {
            console.error("Proxy error:", err);
            res.status(500).json({ error: "Proxy error" });
        },
    }));
    return new Promise((resolve, reject) => {
        const server = app.listen(input.port, async () => {
            console.log(`Proxy server running on port ${input.port}`);
            console.log(`Proxying requests to: ${input.targetUrl}`);
            console.log(`Intercepting: /.well-known/agent-card.json`);
            if (input.autoRegister) {
                await (0, register_to_platform_1.registerToPlatform)(input.platformUrl, `http://localhost:${input.port}`, input.selfRegistrationId);
            }
            resolve();
        });
        server.on("error", (error) => {
            reject(error);
        });
    });
}
//# sourceMappingURL=server.js.map