import { useState } from "react";
import { Check, Copy, ExternalLink, Gamepad2, RefreshCw } from "lucide-react";
import { SITE_IMAGES } from "../config/images";
import {
  BEDROCK_SERVER_ADDRESS,
  BEDROCK_SERVER_IP,
  BEDROCK_SERVER_PORT,
  JAVA_SERVER_ADDRESS,
  JAVA_SERVER_IP,
  JAVA_SERVER_PORT,
  SERVER_NAME,
  getBedrockJoinUri,
  getJavaJoinUri,
} from "../config/server";
import type { NetworkStatusResponse } from "../types/network";
import { ResilientImage } from "./ResilientImage";

interface HeroSectionProps {
  status: NetworkStatusResponse;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onJoinPrompt: (edition: "java" | "bedrock") => void;
}

export function HeroSection({
  status,
  isLoading,
  isRefreshing,
  onRefresh,
  onJoinPrompt,
}: HeroSectionProps) {
  const [copiedKey, setCopiedKey] = useState<"java" | "bedrock" | null>(null);

  const handleCopy = async (edition: "java" | "bedrock", address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedKey(edition);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === edition ? null : current));
      }, 2200);
    } catch {
      onJoinPrompt(edition);
    }
  };

  const handleJoin = (edition: "java" | "bedrock") => {
    const uri = edition === "java" ? getJavaJoinUri() : getBedrockJoinUri();
    // Attempt native Minecraft protocol launch where supported
    const anchor = document.createElement("a");
    anchor.href = uri;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Also open helpful connection instructions modal with one-click copy
    onJoinPrompt(edition);
  };

  return (
    <section
      id="home"
      className="relative min-h-[680px] lg:min-h-[760px] flex items-center overflow-hidden border-b border-white/10"
    >
      {/* Full-bleed Minecraft World Backdrop */}
      <div className="absolute inset-0">
        <ResilientImage
          src={SITE_IMAGES.heroWorld.src}
          alt={SITE_IMAGES.heroWorld.alt}
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/85 via-[#0A0C10]/70 to-[#0A0C10]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0A0C10]/95 via-[#0A0C10]/75 to-transparent"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Branding, Live Count, Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#F59E0B]/60 bg-[#0A0C10] shadow-[0_0_40px_rgba(245,158,11,0.22)] shrink-0">
                <ResilientImage
                  src={SITE_IMAGES.logo.src}
                  alt={SITE_IMAGES.logo.alt}
                  loading="eager"
                  className="w-full h-full object-contain"
                  fallbackLabel="KSHyPixel"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FACC15]">
                  Official Minecraft Java &amp; Bedrock Network
                </p>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white text-balance leading-[1.08]">
                  {SERVER_NAME}
                </h1>
              </div>
            </div>

            {/* Live Player Count Bar (Refreshed every 30s) */}
            <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-xl bg-[#12151C]/90 border border-white/15 backdrop-blur-sm">
              {isLoading ? (
                <span className="text-sm font-medium text-[#CBD5E1] tabular-nums">
                  Checking live server status...
                </span>
              ) : status.anyOnline ? (
                <span className="text-sm sm:text-base font-semibold text-[#4ADE80] tabular-nums">
                  🟢 {status.totalPlayersOnline}{" "}
                  {status.totalPlayersOnline === 1 ? "Player" : "Players"} Online
                </span>
              ) : (
                <span className="text-sm sm:text-base font-semibold text-[#F87171]">
                  🔴 Server Offline
                </span>
              )}

              <span aria-hidden="true" className="text-white/25">
                ·
              </span>

              <span className="text-xs sm:text-sm text-[#94A3B8]">
                Survival · SkyBlock · PvP &amp; BedWars
              </span>

              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="Refresh live player count"
                className="ml-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#FACC15] hover:text-white transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed">
              Experience Survival SMP, floating SkyBlock realms, and competitive
              BedWars-style PvP arenas built for seamless cross-play across Java
              and Bedrock Editions.
            </p>

            {/* Quick Navigation Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#store"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] font-bold text-sm sm:text-base transition-all shadow-[0_0_28px_rgba(245,158,11,0.3)] whitespace-nowrap"
              >
                <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                <span>Explore Rank Store</span>
              </a>
              <a
                href="#rules"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#141821] hover:bg-[#1C2230] text-white border border-white/15 hover:border-[#F59E0B]/50 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
              >
                <span>Read SMP Rules</span>
              </a>
            </div>
          </div>

          {/* Right Column: Java & Bedrock Connection Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Java Edition Connection Card */}
            <div className="rounded-2xl bg-[#11141B]/95 border border-[#F59E0B]/30 p-5 sm:p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-display font-bold text-base sm:text-lg text-[#FACC15]">
                  🟨 JAVA EDITION
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    status.java.online ? "text-[#4ADE80]" : "text-[#F87171]"
                  }`}
                >
                  {status.java.online
                    ? `🟢 ${status.java.playersOnline} Online`
                    : "🔴 Offline"}
                </span>
              </div>

              <div className="rounded-xl bg-[#0A0C10] border border-white/10 px-4 py-3 mb-4">
                <div className="text-xs text-[#94A3B8] mb-1">🌐 SERVER IP</div>
                <div className="font-mono text-sm sm:text-base font-semibold text-white break-all select-all">
                  {JAVA_SERVER_ADDRESS}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-mono tabular-nums">
                  Host: {JAVA_SERVER_IP} · Port: {JAVA_SERVER_PORT}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopy("java", JAVA_SERVER_ADDRESS)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1F2B] hover:bg-[#232A3A] border border-white/15 hover:border-[#F59E0B]/50 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  {copiedKey === "java" ? (
                    <>
                      <Check className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied Java IP!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#FACC15]" />
                      <span>COPY JAVA IP</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleJoin("java")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <span>JOIN JAVA SERVER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bedrock Edition Connection Card */}
            <div className="rounded-2xl bg-[#11141B]/95 border border-emerald-500/30 p-5 sm:p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-display font-bold text-base sm:text-lg text-[#4ADE80]">
                  🟩 BEDROCK EDITION
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    status.bedrock.online ? "text-[#4ADE80]" : "text-[#F87171]"
                  }`}
                >
                  {status.bedrock.online
                    ? `🟢 ${status.bedrock.playersOnline} Online`
                    : "🔴 Offline"}
                </span>
              </div>

              <div className="rounded-xl bg-[#0A0C10] border border-white/10 px-4 py-3 mb-4">
                <div className="text-xs text-[#94A3B8] mb-1">🌐 SERVER IP</div>
                <div className="font-mono text-sm sm:text-base font-semibold text-white break-all select-all">
                  {BEDROCK_SERVER_ADDRESS}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-mono tabular-nums">
                  IP: {BEDROCK_SERVER_IP} · Port: {BEDROCK_SERVER_PORT}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopy("bedrock", BEDROCK_SERVER_ADDRESS)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1F2B] hover:bg-[#232A3A] border border-white/15 hover:border-emerald-400/50 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  {copiedKey === "bedrock" ? (
                    <>
                      <Check className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied Bedrock IP!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#4ADE80]" />
                      <span>COPY BEDROCK IP</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleJoin("bedrock")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0A0C10] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <span>JOIN BEDROCK SERVER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
