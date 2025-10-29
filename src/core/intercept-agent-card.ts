/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomAgentDetail } from "../validations/custom-agent-detail-schema";

export const interceptAgentCard = (
  originalData: any,
  port: number,
  customData?: CustomAgentDetail
) => {
  const defaultParams = {
    author: null,
    container_image_url: null,
    contributors: [],
    framework: null,
    interaction_mode: "multi-turn" as const,
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
