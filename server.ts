import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import type { CommunityReview, EditionStatus, NetworkStatusResponse } from "./src/types/network";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const JAVA_SERVER_ADDRESS = process.env.JAVA_SERVER_ADDRESS || "HypixelKS.aternos.me:50571";
const BEDROCK_SERVER_ADDRESS = process.env.BEDROCK_SERVER_ADDRESS || "mojarra.aternos.host:50571";

const DEFAULT_GAME_MODES = ["Survival", "SkyBlock", "PvP / BedWars"];

function splitAddress(address: string, defaultPort: number): { ip: string; port: number } {
  const parts = address.split(":");
  const ip = parts[0] || address;
  const parsedPort = Number(parts[1]);
  return {
    ip,
    port: Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : defaultPort,
  };
}

function isAternosOfflinePlaceholder(versionText: string, motdText: string, maxPlayers: number): boolean {
  const combined = `${versionText} ${motdText}`.toLowerCase();
  if (
    combined.includes("server is offline") ||
    combined.includes("server not found") ||
    combined.includes("this server is offline") ||
    combined.includes("§4offline") ||
    (maxPlayers === 0 && combined.includes("aternos"))
  ) {
    return true;
  }
  return false;
}

async function fetchWithTimeout(url: string, timeoutMs = 4500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "KSHyPixel-Network-Status/1.0",
        Accept: "application/json",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function queryEditionStatus(
  edition: "java" | "bedrock",
  address: string,
  defaultPort: number
): Promise<EditionStatus> {
  const { ip, port } = splitAddress(address, defaultPort);
  const baseOffline: EditionStatus = {
    edition,
    online: false,
    playersOnline: 0,
    playersMax: 0,
    version: edition === "java" ? "Java Edition" : "Bedrock Edition",
    motd: "",
    address,
    ip,
    port,
    gameModes: DEFAULT_GAME_MODES,
  };

  // Primary provider: api.mcstatus.io
  try {
    const primaryUrl = `https://api.mcstatus.io/v2/status/${edition}/${encodeURIComponent(address)}`;
    const res = await fetchWithTimeout(primaryUrl);
    if (res.ok) {
      const data = (await res.json()) as {
        online?: boolean;
        players?: { online?: number; max?: number };
        version?: { name_clean?: string; name?: string };
        motd?: { clean?: string };
      };

      const versionStr = String(data.version?.name_clean || data.version?.name || baseOffline.version);
      const motdStr = String(data.motd?.clean || "");
      const maxPlayers = Number(data.players?.max ?? 0);
      const onlinePlayers = Number(data.players?.online ?? 0);

      if (data.online === true && !isAternosOfflinePlaceholder(versionStr, motdStr, maxPlayers)) {
        return {
          ...baseOffline,
          online: true,
          playersOnline: Number.isFinite(onlinePlayers) ? Math.max(0, onlinePlayers) : 0,
          playersMax: Number.isFinite(maxPlayers) ? Math.max(0, maxPlayers) : 0,
          version: versionStr,
          motd: motdStr,
        };
      }
      return baseOffline;
    }
  } catch {
    // Fall through to secondary provider
  }

  // Secondary provider: api.mcsrvstat.us
  try {
    const fallbackUrl =
      edition === "java"
        ? `https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`
        : `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(address)}`;
    const res = await fetchWithTimeout(fallbackUrl);
    if (res.ok) {
      const data = (await res.json()) as {
        online?: boolean;
        players?: { online?: number; max?: number };
        version?: string;
        motd?: { clean?: string[] };
      };

      const versionStr = String(data.version || baseOffline.version);
      const motdStr = Array.isArray(data.motd?.clean) ? data.motd.clean.join(" ") : "";
      const maxPlayers = Number(data.players?.max ?? 0);
      const onlinePlayers = Number(data.players?.online ?? 0);

      if (data.online === true && !isAternosOfflinePlaceholder(versionStr, motdStr, maxPlayers)) {
        return {
          ...baseOffline,
          online: true,
          playersOnline: Number.isFinite(onlinePlayers) ? Math.max(0, onlinePlayers) : 0,
          playersMax: Number.isFinite(maxPlayers) ? Math.max(0, maxPlayers) : 0,
          version: versionStr,
          motd: motdStr,
        };
      }
    }
  } catch {
    // Return offline if both providers fail or timeout
  }

  return baseOffline;
}

// Short 15-second in-memory cache to prevent upstream rate limiting across concurrent visitors
let cachedStatus: { data: NetworkStatusResponse; expiresAt: number } | null = null;

async function getLiveNetworkStatus(): Promise<NetworkStatusResponse> {
  const now = Date.now();
  if (cachedStatus && now < cachedStatus.expiresAt) {
    return cachedStatus.data;
  }

  const [java, bedrock] = await Promise.all([
    queryEditionStatus("java", JAVA_SERVER_ADDRESS, 50571),
    queryEditionStatus("bedrock", BEDROCK_SERVER_ADDRESS, 50571),
  ]);

  const payload: NetworkStatusResponse = {
    java,
    bedrock,
    totalPlayersOnline: (java.online ? java.playersOnline : 0) + (bedrock.online ? bedrock.playersOnline : 0),
    anyOnline: java.online || bedrock.online,
    fetchedAt: new Date().toISOString(),
  };

  cachedStatus = {
    data: payload,
    expiresAt: now + 15_000,
  };

  return payload;
}

// Reviews storage (starts empty — never populated with fake reviews)
const DATA_DIR = path.resolve(__dirname, "data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
let memoryReviews: CommunityReview[] = [];

function loadReviews(): CommunityReview[] {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const raw = fs.readFileSync(REVIEWS_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryReviews = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to memory cache
  }
  return memoryReviews;
}

function saveReviews(reviews: CommunityReview[]): void {
  memoryReviews = reviews;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf8");
  } catch {
    // In-memory store remains active if filesystem is read-only
  }
}

loadReviews();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "32kb" }));

  // Live Minecraft Server Status API
  app.get("/api/server-status", async (_req, res) => {
    try {
      const status = await getLiveNetworkStatus();
      res.setHeader("Cache-Control", "no-store");
      res.json(status);
    } catch {
      res.status(500).json({ error: "Unable to query server status" });
    }
  });

  // Community Reviews API
  app.get("/api/reviews", (_req, res) => {
    const reviews = loadReviews();
    res.setHeader("Cache-Control", "no-store");
    res.json({ reviews });
  });

  app.post("/api/reviews", (req, res) => {
    const body = req.body as { name?: unknown; comment?: unknown; rating?: unknown };

    const rawName = typeof body.name === "string" ? body.name.trim() : "";
    const rawComment = typeof body.comment === "string" ? body.comment.trim() : "";
    const rawRating = Number(body.rating);

    if (rawName.length < 2 || rawName.length > 40) {
      res.status(400).json({ error: "Name must be between 2 and 40 characters." });
      return;
    }

    if (rawComment.length < 5 || rawComment.length > 500) {
      res.status(400).json({ error: "Comment must be between 5 and 500 characters." });
      return;
    }

    if (!Number.isInteger(rawRating) || rawRating < 1 || rawRating > 5) {
      res.status(400).json({ error: "Rating must be an integer between 1 and 5." });
      return;
    }

    const newReview: CommunityReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: rawName,
      comment: rawComment,
      rating: rawRating,
      createdAt: new Date().toISOString(),
    };

    const existing = loadReviews();
    const updated = [newReview, ...existing].slice(0, 100);
    saveReviews(updated);

    res.status(201).json({ review: newReview });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KSHyPixel Network server running at http://localhost:${PORT}`);
  });
}

startServer();
