/**
 * Copyright 2025 © Agent Stack a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export async function registerToPlatform(
  platformUrl: string,
  targetUrl: string
): Promise<void> {
  console.log(`Attempt to register ${targetUrl} to ${platformUrl}`);

  const response = await fetch(
    `${platformUrl}/api/v1/providers?auto_remove=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: targetUrl,
      }),
    }
  );

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`Failed to register to platform: ${response.statusText}`);
  }

  console.log("Agent has been registered to the platform.");
}
