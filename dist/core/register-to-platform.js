"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerToPlatform = registerToPlatform;
async function registerToPlatform(platformUrl, targetUrl) {
    console.log(`Attempt to register ${targetUrl} to ${platformUrl}`);
    const response = await fetch(`${platformUrl}/api/v1/providers?auto_remove=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            location: targetUrl,
        }),
    });
    if (!response.ok) {
        console.error(await response.text());
        throw new Error(`Failed to register to platform: ${response.statusText}`);
    }
    console.log("Agent has been registered to the platform.");
}
//# sourceMappingURL=register-to-platform.js.map