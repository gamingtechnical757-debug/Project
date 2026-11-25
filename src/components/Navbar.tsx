import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { SITE_IMAGES } from "../config/images";
import { DISCORD_URL } from "../config/social";
import { SERVER_NAME } from "../config/server";
import { ResilientImage } from "./ResilientImage";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Store", href: "#store" },
  { label: "Ranks", href: "#ranks" },
  { label: "Game Modes", href: "#game-modes" },
  { label: "Rules", href: "#rules" },
  { label: "Server Status", href: "#server-status" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-lg"
        >
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg overflow-hidden border border-[#F59E0B]/40 bg-[#0A0C10] shrink-0">
            <ResilientImage
              src={SITE_IMAGES.logo.src}
              alt={SITE_IMAGES.logo.alt}
              loading="eager"
              className="w-full h-full object-contain"
              fallbackLabel="KS"
            />
          </div>
          <span className="font-display font-bold text-lg lg:text-xl tracking-tight text-white group-hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
            {SERVER_NAME}
          </span>
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#CBD5E1] hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#F59E0B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] font-semibold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
          >
            <span>Discord</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#12151C] text-white hover:border-[#F59E0B]/50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0D1016]">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#E2E8F0] hover:text-[#FACC15] hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FACC15] hover:bg-[#F59E0B]/10 transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
