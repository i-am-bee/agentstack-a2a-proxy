/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import path from "path";
import fs from "fs";
import {
  CustomAgentDetail,
  customAgentDetailSchema,
} from "../validations/custom-agent-detail-schema";
import z from "zod";

export function loadCustomAgentDetail(filePath: string): CustomAgentDetail {
  try {
    const resolvedPath = path.resolve(filePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Custom data file not found: ${resolvedPath}`);
    }

    const fileContent = fs.readFileSync(resolvedPath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    const validatedData = customAgentDetailSchema.parse(jsonData);

    console.log(
      `Successfully loaded custom agent detail data from: ${resolvedPath}`
    );
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`Invalid custom data format in ${filePath}:`, error.issues);
    } else {
      console.error(`Error loading custom data from ${filePath}:`, error);
    }
    throw error;
  }
}
