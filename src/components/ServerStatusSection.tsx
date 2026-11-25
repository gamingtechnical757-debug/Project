import { useState } from "react";
import { Check, Copy, ExternalLink, RefreshCw } from "lucide-react";
import {
  BEDROCK_SERVER_ADDRESS,
  JAVA_SERVER_ADDRESS,
  getBedrockJoinUri,
  getJavaJoinUri,
} from "../config/server";
import type { EditionStatus, NetworkStatusResponse } from "../types/network";

interface ServerStatusSectionProps {
  status: NetworkStatusResponse;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onJoinPrompt: (edition: "java" | "bedrock") => void;
}

export function ServerStatusSection({
  status,
  isLoading,
  isRefreshing,
  onRefresh,
  onJoinPrompt,
}: ServerStatusSectionProps) {
  const [copiedEdition, setCopiedEdition] = useState<"java" | "bedrock" | null>(null);

  const handleCopy = async (edition: "java" | "bedrock", address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedEdition(edition);
      window.setTimeout(() => {
        setCopiedEdition((curr) => (curr === edition ? null : curr));
      }, 2200);
    } catch {
      onJoinPrompt(edition);
    }
  };

  const handleJoin = (edition: "java" | "bedrock") => {
    const uri = edition === "java" ? getJavaJoinUri() : getBedrockJoinUri();
    const link = document.createElement("a");
    link.href = uri;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onJoinPrompt(edition);
  };

  const renderEditionCard = (editionData: EditionStatus) => {
    const isJava = editionData.edition === "java";
    const configuredAddress = isJava ? JAVA_SERVER_ADDRESS : BEDROCK_SERVER_ADDRESS;
    const isCopied = copiedEdition === editionData.edition;

    return (
      <div
        key={editionData.edition}
        className={`rounded-2xl bg-[#12151C] border p-6 sm:p-8 flex flex-col justify-between transition-colors ${
          isJava
            ? "border-[#F59E0B]/25 hover:border-[#F59E0B]/50"
            : "border-emerald-500/25 hover:border-emerald-500/50"
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              {isJava ? "🟨 JAVA EDITION" : "🟩 BEDROCK EDITION"}
            </h3>

            {isLoading ? (
              <span className="text-sm font-medium text-[#94A3B8]">Checking...</span>
            ) : editionData.online ? (
              <span className="text-sm sm:text-base font-semibold text-[#4ADE80]">
                🟢 Online
              </span>
            ) : (
              <span className="text-sm sm:text-base font-semibold text-[#F87171]">
                🔴 Offline
              </span>
            )}
          </div>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
              <dt className="text-sm text-[#94A3B8]">👥 Current Players</dt>
              <dd className="font-mono text-base font-semibold text-white tabular-nums">
                {editionData.online
                  ? editionData.playersMax > 0
                    ? `${editionData.playersOnline} / ${editionData.playersMax}`
                    : `${editionData.playersOnline}`
                  : "0 (Offline)"}
              </dd>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/5">
              <dt className="text-sm text-[#94A3B8]">🌐 Server IP</dt>
              <dd className="font-mono text-sm sm:text-base font-semibold text-[#FACC15] break-all">
                {configuredAddress}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
              <dt className="text-sm text-[#94A3B8]">🎮 Server Version</dt>
              <dd className="font-mono text-sm text-[#E2E8F0]">
                {editionData.version}
              </dd>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              <dt className="text-sm text-[#94A3B8]">🕹️ Game Modes</dt>
              <dd className="text-sm font-medium text-[#E2E8F0] text-right">
                {editionData.gameModes.join(" · ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleCopy(editionData.edition, configuredAddress)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1F2B] hover:bg-[#232A3A] border border-white/15 text-white font-semibold text-sm transition-colors whitespace-nowrap"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span className="text-[#4ADE80]">Copied IP</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#FACC15]" />
                <span>{isJava ? "Copy Java IP" : "Copy Bedrock IP"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleJoin(editionData.edition)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap text-[#0A0C10] ${
              isJava
                ? "bg-[#F59E0B] hover:bg-[#FACC15]"
                : "bg-emerald-500 hover:bg-emerald-400"
            }`}
          >
            <span>{isJava ? "Join Java Server" : "Join Bedrock Server"}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const formattedTime = status.fetchedAt
    ? new Date(status.fetchedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—";

  return (
    <section id="server-status" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-semibold text-[#FACC15]">
              Real-Time Network Telemetry
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight text-balance">
              Live Server Status
            </h2>
            <p className="text-[#94A3B8] text-base">
              Automatically queries both Java and Bedrock realms every 30 seconds
              for accurate player counts and version availability.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-[#94A3B8]">
            <span className="font-mono tabular-nums">
              Last checked: {formattedTime}
            </span>
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141821] hover:bg-[#1D2330] border border-white/15 text-white font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw
                className={`w-4 h-4 text-[#FACC15] ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh Now</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {renderEditionCard(status.java)}
          {renderEditionCard(status.bedrock)}
        </div>
      </div>
    </section>
  );
}
