/**
 * Server Connection & Network Configuration
 * Edit these variables to update server addresses across the entire website.
 */

export const SERVER_NAME = "KSHyPixel Network";
export const SMP_NAME = "KSHyPixel SMP";

// Java Edition Configuration
export const JAVA_SERVER_ADDRESS = "HypixelKS.aternos.me:50571";
export const JAVA_SERVER_IP = "HypixelKS.aternos.me";
export const JAVA_SERVER_PORT = 50571;

// Bedrock Edition Configuration
export const BEDROCK_SERVER_ADDRESS = "mojarra.aternos.host:50571";
export const BEDROCK_SERVER_IP = "mojarra.aternos.host";
export const BEDROCK_SERVER_PORT = 50571;

// Live status polling interval (30 seconds)
export const STATUS_REFRESH_INTERVAL_MS = 30_000;

export const NETWORK_GAME_MODES = ["Survival", "SkyBlock", "PvP / BedWars"];

/**
 * Generates a Bedrock deep link URI (`minecraft://?addExternalServer=...`)
 * supported on Windows, iOS, and Android Minecraft Bedrock clients.
 */
export function getBedrockJoinUri(): string {
  const encodedName = encodeURIComponent(SERVER_NAME);
  return `minecraft://?addExternalServer=${encodedName}|${BEDROCK_SERVER_IP}:${BEDROCK_SERVER_PORT}`;
}

/**
 * Generates a Java Edition join URI (`minecraft://connect/...`) where supported
 * by custom launcher protocol handlers.
 */
export function getJavaJoinUri(): string {
  return `minecraft://connect/${JAVA_SERVER_IP}:${JAVA_SERVER_PORT}`;
}
