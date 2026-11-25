import { ExternalLink } from "lucide-react";
import { SOCIAL_LINKS } from "../config/social";

const CARD_STYLES: Record<
  "discord" | "youtube" | "whatsapp",
  { border: string; button: string; accent: string }
> = {
  discord: {
    border: "border-indigo-400/25 hover:border-indigo-400/60",
    button: "bg-indigo-500 hover:bg-indigo-400 text-white",
    accent: "text-indigo-300",
  },
  youtube: {
    border: "border-rose-500/25 hover:border-rose-400/60",
    button: "bg-rose-600 hover:bg-rose-500 text-white",
    accent: "text-rose-300",
  },
  whatsapp: {
    border: "border-emerald-500/25 hover:border-emerald-400/60",
    button: "bg-emerald-500 hover:bg-emerald-400 text-[#0A0C10]",
    accent: "text-emerald-300",
  },
};

export function CommunitySocialSection() {
  return (
    <section id="community" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-sm font-semibold text-[#FACC15]">
            Stay Connected
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
            Join the KSHyPixel Community
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Connect with players, catch live announcements, and follow server
            events across Discord, YouTube, and WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SOCIAL_LINKS.map((item) => {
            const style = CARD_STYLES[item.id];
            return (
              <article
                key={item.id}
                className={`rounded-2xl bg-[#12151C] border ${style.border} p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-bold text-2xl text-white">
                      {item.name}
                    </h3>
                    <span className={`font-mono text-xs ${style.accent}`}>
                      {item.handle}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${style.button}`}
                >
                  <span>{item.buttonLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
