import { CustomAgentDetail } from "./validations/custom-agent-detail-schema";
import { CliInput } from "./validations/cli-config";
export declare function startProxy(input: Pick<CliInput, "autoRegister" | "port"> & {
    platformUrl: string;
    targetUrl: string;
} & Partial<{
    customData: CustomAgentDetail;
}>): Promise<void>;
//# sourceMappingURL=server.d.ts.map