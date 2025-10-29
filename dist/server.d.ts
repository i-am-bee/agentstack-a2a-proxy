/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomAgentDetail } from "./validations/custom-agent-detail-schema";
import { CliInput } from "./validations/cli-config";
export declare function startProxy(input: Pick<CliInput, "autoRegister" | "port"> & {
    platformUrl: string;
    targetUrl: string;
} & Partial<{
    customData: CustomAgentDetail;
}>): Promise<void>;
//# sourceMappingURL=server.d.ts.map