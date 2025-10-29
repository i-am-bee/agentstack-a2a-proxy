"use strict";
/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptAgentCard = void 0;
const interceptAgentCard = (originalData, port, customData) => {
    const defaultParams = {
        author: null,
        container_image_url: null,
        contributors: [],
        framework: null,
        interaction_mode: "multi-turn",
        variables: [],
    };
    const mergedParams = customData
        ? {
            ...defaultParams,
            ...customData,
        }
        : defaultParams;
    return {
        ...originalData,
        capabilities: {
            ...originalData.capabilities,
            extensions: [
                {
                    uri: "https://a2a-extensions.agentstack.dev/ui/agent-detail/v1",
                    required: false,
                    params: mergedParams,
                },
            ],
        },
        url: `http://localhost:${port}/`,
    };
};
exports.interceptAgentCard = interceptAgentCard;
//# sourceMappingURL=intercept-agent-card.js.map