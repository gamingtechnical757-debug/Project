import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  FEATURED_REALM_BANNERS,
  GAME_MODE_OVERVIEW_CARDS,
  type GameModeBannerItem,
} from "../data/gameModes";
import { ResilientImage } from "./ResilientImage";

export function GameModesOverviewSection() {
  return (
    <section id="game-modes" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-sm font-semibold text-[#FACC15]">
            Explore Every Realm
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
            Game Modes Built for Every Playstyle
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Jump into cooperative Survival SMP, engineer floating islands in
            SkyBlock, or test your combat instincts in BedWars-style PvP arenas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GAME_MODE_OVERVIEW_CARDS.map((mode) => (
            <article
              key={mode.id}
              className="group relative rounded-2xl overflow-hidden bg-[#12151C] border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col justify-end min-h-[300px] sm:min-h-[340px]"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={mode.image}
                  alt={mode.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/70 to-[#0A0C10]/20"
                />
              </div>

              <div className="relative z-10 p-6 sm:p-8 space-y-2.5">
                <div className="text-sm font-semibold text-[#FACC15]">
                  {mode.emoji} {mode.tagline}
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {mode.title}
                </h3>
                <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl leading-relaxed">
                  {mode.description}
                </p>
                {mode.id !== "world" && (
                  <div className="pt-2">
                    <a
                      href={`#banner-${mode.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FACC15] hover:text-white transition-colors"
                    >
                      <span>Explore {mode.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RealmBannerShowcase({
  banner,
}: {
  banner: GameModeBannerItem;
}) {
  const isRightAligned = banner.align === "right";

  return (
    <section
      id={`banner-${banner.id}`}
      className="relative py-20 lg:py-28 overflow-hidden border-b border-white/10"
    >
      {/* Full-width Cinematic Banner Image */}
      <div className="absolute inset-0">
        <ResilientImage
          src={banner.image}
          alt={banner.imageAlt}
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            isRightAligned
              ? "bg-gradient-to-l from-[#0A0C10]/95 via-[#0A0C10]/80 to-[#0A0C10]/45"
              : "bg-gradient-to-r from-[#0A0C10]/95 via-[#0A0C10]/80 to-[#0A0C10]/45"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/55 via-transparent to-[#0A0C10]/70"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl ${
            isRightAligned ? "lg:ml-auto" : ""
          } rounded-2xl bg-[#0D1017]/80 backdrop-blur-md border border-white/15 p-7 sm:p-10 space-y-5 shadow-2xl`}
        >
          <div className="text-sm font-semibold text-[#FACC15]">
            {banner.badgeLabel}
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight text-balance">
              {banner.title}
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#E2E8F0]">
              {banner.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            {banner.description}
          </p>

          <ul className="space-y-2.5 pt-1">
            {banner.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[#E2E8F0]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] font-bold text-sm transition-colors whitespace-nowrap"
            >
              <span>Connect &amp; Play</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#store"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161B24] hover:bg-[#1F2633] text-white border border-white/15 font-semibold text-sm transition-colors whitespace-nowrap"
            >
              <span>View Store Ranks</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AllRealmBanners() {
  return (
    <>
      {FEATURED_REALM_BANNERS.map((banner) => (
        <RealmBannerShowcase key={banner.id} banner={banner} />
      ))}
    </>
  );
}
