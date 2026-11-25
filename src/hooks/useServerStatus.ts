import { useCallback, useEffect, useState } from "react";
import {
  BEDROCK_SERVER_ADDRESS,
  BEDROCK_SERVER_IP,
  BEDROCK_SERVER_PORT,
  JAVA_SERVER_ADDRESS,
  JAVA_SERVER_IP,
  JAVA_SERVER_PORT,
  NETWORK_GAME_MODES,
  STATUS_REFRESH_INTERVAL_MS,
} from "../config/server";
import type { NetworkStatusResponse } from "../types/network";

const INITIAL_FALLBACK_STATUS: NetworkStatusResponse = {
  java: {
    edition: "java",
    online: false,
    playersOnline: 0,
    playersMax: 0,
    version: "Java Edition",
    motd: "",
    address: JAVA_SERVER_ADDRESS,
    ip: JAVA_SERVER_IP,
    port: JAVA_SERVER_PORT,
    gameModes: NETWORK_GAME_MODES,
  },
  bedrock: {
    edition: "bedrock",
    online: false,
    playersOnline: 0,
    playersMax: 0,
    version: "Bedrock Edition",
    motd: "",
    address: BEDROCK_SERVER_ADDRESS,
    ip: BEDROCK_SERVER_IP,
    port: BEDROCK_SERVER_PORT,
    gameModes: NETWORK_GAME_MODES,
  },
  totalPlayersOnline: 0,
  anyOnline: false,
  fetchedAt: "",
};

export function useServerStatus() {
  const [status, setStatus] = useState<NetworkStatusResponse>(INITIAL_FALLBACK_STATUS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchStatus = useCallback(async (manual = false) => {
    if (manual) {
      setIsRefreshing(true);
    }
    try {
      const response = await fetch("/api/server-status", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = (await response.json()) as NetworkStatusResponse;
      setStatus(data);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus(false);
    const intervalId = window.setInterval(() => {
      fetchStatus(false);
    }, STATUS_REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchStatus]);

  return {
    status,
    isLoading,
    isRefreshing,
    hasError,
    refreshNow: () => fetchStatus(true),
  };
}
