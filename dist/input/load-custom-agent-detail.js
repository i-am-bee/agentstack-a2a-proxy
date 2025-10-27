"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCustomAgentDetail = loadCustomAgentDetail;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const custom_agent_detail_schema_1 = require("../validations/custom-agent-detail-schema");
const zod_1 = __importDefault(require("zod"));
function loadCustomAgentDetail(filePath) {
    try {
        const resolvedPath = path_1.default.resolve(filePath);
        if (!fs_1.default.existsSync(resolvedPath)) {
            throw new Error(`Custom data file not found: ${resolvedPath}`);
        }
        const fileContent = fs_1.default.readFileSync(resolvedPath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        const validatedData = custom_agent_detail_schema_1.customAgentDetailSchema.parse(jsonData);
        console.log(`Successfully loaded custom agent detail data from: ${resolvedPath}`);
        return validatedData;
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error(`Invalid custom data format in ${filePath}:`, error.issues);
        }
        else {
            console.error(`Error loading custom data from ${filePath}:`, error);
        }
        throw error;
    }
}
//# sourceMappingURL=load-custom-agent-detail.js.map