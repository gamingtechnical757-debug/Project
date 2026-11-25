import { ExternalLink, Video } from "lucide-react";
import { DISCORD_URL, YOUTUBE_URL } from "../config/social";

export interface CreatorProfile {
  id: string;
  name: string;
  platform: string;
  channelUrl: string;
  avatarUrl?: string;
}

/**
 * Add verified/approved partner creator profiles here when collaboration is confirmed.
 * Keep empty by default so no fabricated endorsements appear.
 */
export const FEATURED_CREATORS: CreatorProfile[] = [];

export function FeaturedCreatorsSection() {
  return (
    <section id="creators" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-[#FACC15]">
              Creator Spotlight
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight text-balance">
              🎥 Featured Creators
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Showcase space dedicated to verified content creators, builders,
              and streamers collaborating with KSHyPixel Network.
            </p>
          </div>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141821] hover:bg-[#1E2432] border border-[#F59E0B]/40 text-[#FACC15] font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <span>Apply for MEDIA Rank</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {FEATURED_CREATORS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_CREATORS.map((creator) => (
              <a
                key={creator.id}
                href={creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#12151C] border border-white/10 hover:border-[#F59E0B]/50 p-6 flex items-center gap-4 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0A0C10] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {creator.avatarUrl ? (
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Video className="w-6 h-6 text-[#FACC15]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-lg text-white truncate">
                    {creator.name}
                  </div>
                  <div className="text-sm text-[#94A3B8] truncate">
                    {creator.platform}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#12151C] border border-dashed border-white/15 p-7 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#FACC15]">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Partner Slot Open
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Reserved for verified YouTube and Twitch creators streaming
                KSHyPixel Survival, SkyBlock, or BedWars.
              </p>
            </div>

            <div className="rounded-2xl bg-[#12151C] border border-dashed border-white/15 p-7 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#FACC15]">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Official Channel
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Follow official server showcases and community guides directly
                on{" "}
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FACC15] hover:underline font-medium"
                >
                  @EducateAarav
                </a>
                .
              </p>
            </div>

            <div className="rounded-2xl bg-[#12151C] border border-dashed border-white/15 p-7 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#FACC15]">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Collaborate With Us
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Have an active Minecraft channel? Reach out on Discord with your
                channel link to join our creator showcase.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
