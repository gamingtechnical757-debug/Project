import { SITE_IMAGES } from "../config/images";
import {
  BEDROCK_SERVER_ADDRESS,
  JAVA_SERVER_ADDRESS,
  SERVER_NAME,
} from "../config/server";
import { DISCORD_URL, WHATSAPP_URL, YOUTUBE_URL } from "../config/social";
import { ResilientImage } from "./ResilientImage";

export function Footer() {
  return (
    <footer className="bg-[#07090D] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Server Addresses */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#F59E0B]/40 bg-[#0A0C10] shrink-0">
                <ResilientImage
                  src={SITE_IMAGES.logo.src}
                  alt={SITE_IMAGES.logo.alt}
                  className="w-full h-full object-contain"
                  fallbackLabel="KS"
                />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">
                  {SERVER_NAME}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  Survival · SkyBlock · PvP &amp; BedWars
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-[#10131A] border border-white/10 px-4 py-3">
                <div className="font-semibold text-[#FACC15] mb-0.5">
                  🟨 JAVA EDITION
                </div>
                <div className="font-mono text-[#E2E8F0] break-all">
                  Server IP: {JAVA_SERVER_ADDRESS}
                </div>
              </div>

              <div className="rounded-xl bg-[#10131A] border border-white/10 px-4 py-3">
                <div className="font-semibold text-[#4ADE80] mb-0.5">
                  🟩 BEDROCK EDITION
                </div>
                <div className="font-mono text-[#E2E8F0] break-all">
                  Server IP: {BEDROCK_SERVER_ADDRESS}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <a href="#home" className="hover:text-[#FACC15] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-[#FACC15] transition-colors">
                  Store
                </a>
              </li>
              <li>
                <a href="#ranks" className="hover:text-[#FACC15] transition-colors">
                  Ranks
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-[#FACC15] transition-colors">
                  Rules
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="hover:text-[#FACC15] transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FACC15] transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              Social
            </h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FACC15] transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FACC15] transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FACC15] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="text-xs text-[#64748B] pt-2 leading-relaxed">
              Not an official Minecraft product. Not approved by or associated
              with Mojang or Microsoft.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#94A3B8]">
          <div>© {SERVER_NAME}</div>
          <div>Java &amp; Bedrock Cross-Play Network</div>
        </div>
      </div>
    </footer>
  );
}
