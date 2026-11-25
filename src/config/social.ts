/**
 * Official Community & Social Links Configuration
 * Update URLs here to reflect changes across navbar, community section, and footer.
 */

export interface SocialLinkItem {
  id: "discord" | "youtube" | "whatsapp";
  name: string;
  buttonLabel: string;
  description: string;
  url: string;
  handle: string;
}

export const DISCORD_URL = "https://discord.gg/ssk5T6XdpN";
export const YOUTUBE_URL = "https://www.youtube.com/@EducateAarav";
export const WHATSAPP_URL = "https://whatsapp.com/channel/0029Vb9XOv4BPzjZTxFg8E1M";

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "discord",
    name: "Discord",
    buttonLabel: "💬 Join Discord",
    description:
      "Connect with fellow players, get live server announcements, report bugs, and open support tickets with staff.",
    url: DISCORD_URL,
    handle: "discord.gg/ssk5T6XdpN",
  },
  {
    id: "youtube",
    name: "YouTube",
    buttonLabel: "▶️ YouTube",
    description:
      "Watch official server updates, community builds, event highlights, and gameplay guides on our channel.",
    url: YOUTUBE_URL,
    handle: "@EducateAarav",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    buttonLabel: "📱 WhatsApp",
    description:
      "Follow the official KSHyPixel Network WhatsApp channel for instant maintenance alerts, events, and rank drops.",
    url: WHATSAPP_URL,
    handle: "KSHyPixel Channel",
  },
];
