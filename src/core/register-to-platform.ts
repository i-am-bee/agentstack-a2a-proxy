/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export async function registerToPlatform(
  platformUrl: string,
  targetUrl: string,
  selfRegistrationId: string
): Promise<void> {
  console.log(`Attempt to register ${targetUrl} to ${platformUrl}`);

  const allProviders = await fetch(`${platformUrl}/api/v1/providers`);
  if (!allProviders.ok) {
    console.error(await allProviders.text());
    throw new Error(`Failed to get all providers: ${allProviders.statusText}`);
  }
  const allProvidersData = (await allProviders.json()) as { items: any[] };
  if (
    allProvidersData.items.length > 0 &&
    allProvidersData.items.some((item) =>
      item.source.endsWith(`#${selfRegistrationId}`)
    )
  ) {
    console.log("Agent already registered to the platform.");
    return;
  }

  const response = await fetch(`${platformUrl}/api/v1/providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: `${targetUrl}#${selfRegistrationId}`,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`Failed to register to platform: ${response.statusText}`);
  }

  console.log("Agent has been registered to the platform.");
}
