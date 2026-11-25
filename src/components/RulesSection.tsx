import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { PUNISHMENT_POLICY, SERVER_RULES, type ServerRule } from "../data/rules";

type RuleFilter = "all" | ServerRule["category"];

const FILTER_LABELS: { id: RuleFilter; label: string }[] = [
  { id: "all", label: "All Rules (20)" },
  { id: "conduct", label: "Conduct" },
  { id: "gameplay", label: "Gameplay" },
  { id: "safety", label: "Safety" },
  { id: "staff", label: "Staff" },
];

export function RulesSection() {
  const [filter, setFilter] = useState<RuleFilter>("all");
  const [query, setQuery] = useState("");
  const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
    // Expand all by default on load so Hindi rules are immediately readable
    const initial: Record<number, boolean> = {};
    for (const r of SERVER_RULES) {
      initial[r.number] = true;
    }
    return initial;
  });

  const filteredRules = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVER_RULES.filter((rule) => {
      const matchesCat = filter === "all" || rule.category === filter;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        rule.title.toLowerCase().includes(q) ||
        rule.description.toLowerCase().includes(q) ||
        String(rule.number) === q
      );
    });
  }, [filter, query]);

  const allExpanded =
    filteredRules.length > 0 &&
    filteredRules.every((r) => Boolean(openMap[r.number]));

  const toggleAll = () => {
    const nextState = !allExpanded;
    setOpenMap((prev) => {
      const copy = { ...prev };
      for (const r of filteredRules) {
        copy[r.number] = nextState;
      }
      return copy;
    });
  };

  const toggleSingle = (ruleNum: number) => {
    setOpenMap((prev) => ({
      ...prev,
      [ruleNum]: !prev[ruleNum],
    }));
  };

  return (
    <section id="rules" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-[#FACC15]">
              Fair Play Charter
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
              📜 KSHyPixel SMP SERVER RULES
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Every player and staff member on KSHyPixel Network agrees to uphold
              these 20 rules to keep Survival, SkyBlock, and PvP welcoming and
              fair.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="self-start lg:self-auto px-4 py-2.5 rounded-xl bg-[#141821] hover:bg-[#1D2330] border border-white/15 text-sm font-semibold text-white transition-colors whitespace-nowrap"
          >
            {allExpanded ? "Collapse All Rules" : "Expand All Rules"}
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#12151C] border border-white/10">
            {FILTER_LABELS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? "bg-[#F59E0B] text-[#0A0C10]"
                    : "text-[#CBD5E1] hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rules..."
              aria-label="Search server rules"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12151C] border border-white/15 focus:border-[#F59E0B] focus:outline-none text-sm text-white placeholder-[#64748B]"
            />
          </div>
        </div>

        {/* Numbered Rules Accordion Grid */}
        {filteredRules.length === 0 ? (
          <div className="rounded-2xl bg-[#12151C] border border-white/10 p-10 text-center text-[#94A3B8]">
            No rules match your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRules.map((rule) => {
              const isOpen = Boolean(openMap[rule.number]);
              return (
                <div
                  key={rule.number}
                  className="rounded-2xl bg-[#12151C] border border-white/10 hover:border-[#F59E0B]/40 transition-colors overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleSingle(rule.number)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#0A0C10] bg-[#FACC15] w-7 h-7 rounded-lg flex items-center justify-center shrink-0 tabular-nums">
                        {rule.number}
                      </span>
                      <span className="font-display font-bold text-base sm:text-lg text-white truncate">
                        {rule.emoji} {rule.title}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#94A3B8] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-0 pl-[3.75rem] text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {rule.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Punishment Policy & Final Banner */}
        <div className="mt-10 rounded-2xl bg-[#141112] border border-rose-500/35 p-6 sm:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-rose-400">
                {PUNISHMENT_POLICY.heading}
              </h3>
              <p className="text-sm sm:text-base text-[#E2E8F0] mt-1">
                {PUNISHMENT_POLICY.intro}
              </p>
            </div>

            <div className="font-display font-bold text-sm sm:text-base tracking-wide text-[#FACC15] bg-[#0A0C10] border border-[#F59E0B]/35 px-4 py-2.5 rounded-xl whitespace-nowrap">
              {PUNISHMENT_POLICY.finalMessage}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PUNISHMENT_POLICY.steps.map((step) => (
              <div
                key={step}
                className="rounded-xl bg-[#0A0C10]/85 border border-white/10 px-4 py-3 text-sm font-semibold text-white text-center"
              >
                {step}
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#FDE68A] font-medium">
            {PUNISHMENT_POLICY.note}
          </p>
        </div>
      </div>
    </section>
  );
}
