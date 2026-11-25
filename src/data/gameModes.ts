import { SITE_IMAGES } from "../config/images";

export interface GameModeBannerItem {
  id: "survival" | "skyblock" | "pvp" | "world";
  badgeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  align: "left" | "right";
}

export const GAME_MODE_OVERVIEW_CARDS = [
  {
    id: "survival",
    emoji: "🏔️",
    title: "Survival SMP",
    tagline: "Build, trade & thrive",
    description:
      "Claim land, forge alliances, trade diamonds & netherite, and explore a rich community-driven survival world.",
    image: SITE_IMAGES.survivalBanner.src,
    imageAlt: SITE_IMAGES.survivalBanner.alt,
  },
  {
    id: "skyblock",
    emoji: "☁️",
    title: "SkyBlock",
    tagline: "Expand from a single island",
    description:
      "Begin high above the clouds with limited resources and grow your floating empire through smart automation and progression.",
    image: SITE_IMAGES.skyblockBanner.src,
    imageAlt: SITE_IMAGES.skyblockBanner.alt,
  },
  {
    id: "pvp",
    emoji: "⚔️",
    title: "PvP & BedWars-Style",
    tagline: "Fast-paced tactical combat",
    description:
      "Defend your base, bridge across sky arenas, and outmaneuver rival squads in competitive BedWars-style & PvP battles.",
    image: SITE_IMAGES.pvpBanner.src,
    imageAlt: SITE_IMAGES.pvpBanner.alt,
  },
  {
    id: "world",
    emoji: "🌎",
    title: "Server World",
    tagline: "Cross-play Java & Bedrock",
    description:
      "Seamlessly explore custom hubs, player warps, and seasonal events alongside friends across Java and Bedrock Editions.",
    image: SITE_IMAGES.heroWorld.src,
    imageAlt: SITE_IMAGES.heroWorld.alt,
  },
];

export const FEATURED_REALM_BANNERS: GameModeBannerItem[] = [
  {
    id: "survival",
    badgeLabel: "🏔️ Survival",
    title: "KSHyPixel Survival SMP",
    subtitle: "Player-driven economy, protected builds, and endless exploration",
    description:
      "Start with /spawn and /sethome, carve out your homestead in untouched biomes, trade rare diamonds and netherite with trusted players, and climb the ranks fairly without griefers.",
    highlights: [
      "Protected bases & strict anti-grief rules",
      "Diamond & Netherite driven player economy",
      "Cross-edition play for Java & Bedrock friends",
    ],
    image: SITE_IMAGES.survivalBanner.src,
    imageAlt: SITE_IMAGES.survivalBanner.alt,
    align: "left",
  },
  {
    id: "skyblock",
    badgeLabel: "☁️ SkyBlock",
    title: "SkyBlock Floating Realms",
    subtitle: "Turn a humble starter island into a thriving sky archipelago",
    description:
      "Every cobblestone block counts. Construct automated farms, bridge out to resource islands, unlock rank utilities like /workbench and /enderchest, and build an unmistakable sky empire.",
    highlights: [
      "Progressive island expansion above the void",
      "Balanced resource generators & trading",
      "Co-op friendly islands for friends & squads",
    ],
    image: SITE_IMAGES.skyblockBanner.src,
    imageAlt: SITE_IMAGES.skyblockBanner.alt,
    align: "right",
  },
  {
    id: "pvp",
    badgeLabel: "⚔️ PvP / BedWars",
    title: "PvP & BedWars-Style Arenas",
    subtitle: "Sharp reflexes, rapid bridging, and fair-play combat",
    description:
      "Put your swordplay, bow aim, and bridge rush tactics to the test in high-stakes aerial arenas. Strict anti-cheat enforcement ensures every duel and team match is won purely by skill.",
    highlights: [
      "BedWars-style resource rush & base defense",
      "Zero tolerance for hacks, X-Ray, or Kill Aura",
      "Balanced matchmaking & active staff oversight",
    ],
    image: SITE_IMAGES.pvpBanner.src,
    imageAlt: SITE_IMAGES.pvpBanner.alt,
    align: "left",
  },
];
