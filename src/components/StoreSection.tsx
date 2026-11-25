import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Terminal, X } from "lucide-react";
import { SERVER_RANKS, type RankDefinition } from "../data/ranks";
import { DISCORD_URL } from "../config/social";

const TIER_STYLES: Record<
  RankDefinition["accentTier"],
  { border: string; headerBg: string; titleColor: string; button: string }
> = {
  neutral: {
    border: "border-white/15 hover:border-white/30",
    headerBg: "bg-[#171B24]",
    titleColor: "text-white",
    button:
      "bg-[#1F2532] hover:bg-[#2B3344] text-white border border-white/15",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/60",
    headerBg: "bg-gradient-to-br from-amber-500/15 to-[#12151C]",
    titleColor: "text-amber-300",
    button: "bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10]",
  },
  gold: {
    border: "border-[#FACC15]/45 hover:border-[#FACC15]/80",
    headerBg: "bg-gradient-to-br from-[#FACC15]/20 to-[#12151C]",
    titleColor: "text-[#FACC15]",
    button:
      "bg-[#FACC15] hover:bg-[#FEF08A] text-[#0A0C10] shadow-[0_0_24px_rgba(250,204,21,0.25)]",
  },
  emerald: {
    border: "border-emerald-500/35 hover:border-emerald-400/70",
    headerBg: "bg-gradient-to-br from-emerald-500/15 to-[#12151C]",
    titleColor: "text-emerald-400",
    button: "bg-emerald-500 hover:bg-emerald-400 text-[#0A0C10]",
  },
  royal: {
    border: "border-sky-400/35 hover:border-sky-400/70",
    headerBg: "bg-gradient-to-br from-sky-500/15 to-[#12151C]",
    titleColor: "text-sky-300",
    button: "bg-sky-400 hover:bg-sky-300 text-[#0A0C10]",
  },
  crimson: {
    border: "border-rose-500/40 hover:border-rose-400/75",
    headerBg: "bg-gradient-to-br from-rose-500/18 to-[#12151C]",
    titleColor: "text-rose-400",
    button: "bg-rose-500 hover:bg-rose-400 text-white",
  },
};

export function StoreSection() {
  const [expandedRanks, setExpandedRanks] = useState<Record<string, boolean>>({
    default: true,
    vip: true,
  });
  const [selectedRank, setSelectedRank] = useState<RankDefinition | null>(null);

  const toggleCommands = (rankId: string) => {
    setExpandedRanks((prev) => ({
      ...prev,
      [rankId]: !prev[rankId],
    }));
  };

  return (
    <section id="store" className="py-16 lg:py-24 border-b border-white/10">
      <div id="ranks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-[#FACC15]">
              Official Server Store
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
              Ranks &amp; Server Upgrades
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Unlock convenience utilities, community recognition, or staff
              tooling across KSHyPixel Network using in-game Diamonds &amp;
              Netherite.
            </p>
          </div>

          <div className="text-sm text-[#CBD5E1] bg-[#12151C] border border-white/10 rounded-xl px-4 py-3">
            <span className="font-semibold text-[#FACC15]">Currency:</span>{" "}
            <span>💎 Diamonds + 🟫 Netherite · Payment integration ready</span>
          </div>
        </div>

        {/* 3x2 Desktop Grid: [DEFAULT][MEDIA][VIP] / [MOD][GOD][ADMIN] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {SERVER_RANKS.map((rank) => {
            const style = TIER_STYLES[rank.accentTier];
            const isExpanded = Boolean(expandedRanks[rank.id]);

            return (
              <article
                key={rank.id}
                className={`rounded-2xl bg-[#12151C] border ${style.border} flex flex-col justify-between overflow-hidden transition-all duration-200`}
              >
                <div>
                  {/* Rank Card Header */}
                  <div className={`p-6 border-b border-white/10 ${style.headerBg}`}>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3
                        className={`font-display font-extrabold text-2xl tracking-tight ${style.titleColor}`}
                      >
                        {rank.name}
                      </h3>
                      <span className="font-mono text-xs font-medium text-[#CBD5E1] tabular-nums">
                        Weight: {rank.weight}
                      </span>
                    </div>

                    {/* Price Display */}
                    {rank.isFree ? (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="text-xs text-[#94A3B8] mb-1">Price</div>
                        <div className="font-display font-bold text-2xl text-[#4ADE80]">
                          🟢 FREE
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                        <div className="text-xs text-[#94A3B8]">
                          Price: 💎 {rank.diamonds} Diamonds + 🟫 {rank.netherite}{" "}
                          Netherite
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="rounded-lg bg-[#0A0C10]/80 border border-white/10 px-3 py-2">
                            <div className="text-[11px] text-[#94A3B8]">
                              Diamonds
                            </div>
                            <div className="font-mono font-bold text-base text-sky-300 tabular-nums">
                              💎 {rank.diamonds}
                            </div>
                          </div>
                          <div className="rounded-lg bg-[#0A0C10]/80 border border-white/10 px-3 py-2">
                            <div className="text-[11px] text-[#94A3B8]">
                              Netherite
                            </div>
                            <div className="font-mono font-bold text-base text-amber-300 tabular-nums">
                              🟫 {rank.netherite}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rank Features Area */}
                  <div className="p-6 space-y-5">
                    <p className="text-sm text-[#CBD5E1] leading-relaxed">
                      {rank.summary}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                        Rank Features
                      </div>
                      <ul className="space-y-2">
                        {rank.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2 text-sm text-[#E2E8F0]"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Commands Drawer */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => toggleCommands(rank.id)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between gap-2 py-2 text-left text-sm font-semibold text-white hover:text-[#FACC15] transition-colors"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-[#FACC15]" />
                          <span>
                            Commands{" "}
                            <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
                              ({rank.commands.length})
                            </span>
                          </span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 rounded-xl bg-[#0A0C10] border border-white/10 p-3.5 max-h-52 overflow-y-auto">
                          {rank.commands.length > 0 ? (
                            <ul className="space-y-1.5 font-mono text-xs text-[#FACC15]">
                              {rank.commands.map((cmd) => (
                                <li
                                  key={cmd}
                                  className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 break-all"
                                >
                                  {cmd}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                              Inherits all Default commands. No extra commands
                              assigned to this tier.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedRank(rank)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${style.button}`}
                  >
                    {rank.isFree ? "JOIN WITH DEFAULT" : "BUY NOW"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Rank Action / Future Checkout Integration Modal */}
      {selectedRank && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rank-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedRank(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#12151C] border border-[#F59E0B]/40 p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FACC15]">
                  KSHyPixel Network Store
                </p>
                <h3
                  id="rank-modal-title"
                  className="font-display font-bold text-2xl text-white mt-1"
                >
                  {selectedRank.name} Rank
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRank(null)}
                aria-label="Close rank details"
                className="w-9 h-9 rounded-lg bg-[#1B202C] hover:bg-[#252C3C] text-[#CBD5E1] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl bg-[#0A0C10] border border-white/10 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8]">Rank Weight</span>
                <span className="font-mono text-white font-semibold">
                  {selectedRank.weight}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8]">Required Resources</span>
                <span className="font-mono text-[#FACC15] font-semibold">
                  {selectedRank.isFree
                    ? "🟢 FREE"
                    : `💎 ${selectedRank.diamonds} Diamonds + 🟫 ${selectedRank.netherite} Netherite`}
                </span>
              </div>
            </div>

            {selectedRank.isFree ? (
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                The <strong className="text-white">DEFAULT</strong> rank is
                automatically active for every player who joins KSHyPixel
                Network. Copy the Java or Bedrock IP above and jump right in.
              </p>
            ) : (
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Online checkout is currently in preview mode while payment
                integration is finalized. To claim{" "}
                <strong className="text-white">{selectedRank.name}</strong> with{" "}
                <span className="text-sky-300 font-medium">
                  {selectedRank.diamonds} Diamonds
                </span>{" "}
                and{" "}
                <span className="text-amber-300 font-medium">
                  {selectedRank.netherite} Netherite
                </span>
                , open a store ticket in our official Discord server.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRank(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1A1F2B] hover:bg-[#242B3B] text-white text-sm font-medium transition-colors"
              >
                Close
              </button>
              {!selectedRank.isFree && (
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] text-sm font-bold transition-colors"
                >
                  Claim via Discord
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
