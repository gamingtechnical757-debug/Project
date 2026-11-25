export interface RankDefinition {
  id: "default" | "media" | "vip" | "mod" | "god" | "admin";
  name: string;
  weight: string;
  isFree: boolean;
  diamonds: number;
  netherite: number;
  summary: string;
  features: string[];
  commands: string[];
  accentTier: "neutral" | "amber" | "gold" | "emerald" | "crimson" | "royal";
  featured?: boolean;
}

/**
 * Desktop Store Grid Order:
 * Row 1: [ DEFAULT ] [ MEDIA ] [ VIP ]
 * Row 2: [ MOD ]     [ GOD ]   [ ADMIN ]
 */
export const SERVER_RANKS: RankDefinition[] = [
  {
    id: "default",
    name: "DEFAULT",
    weight: "Default",
    isFree: true,
    diamonds: 0,
    netherite: 0,
    summary: "Essential starter permissions unlocked automatically for every new adventurer joining KSHyPixel Network.",
    features: [
      "Instant free access upon joining",
      "Personal home teleportation & warp travel",
      "Direct player messaging & TPA requests",
      "Full access to Survival, SkyBlock & PvP arenas",
    ],
    commands: [
      "/spawn",
      "/help",
      "/msg <player> <message>",
      "/r <message>",
      "/tpa <player>",
      "/tpaccept",
      "/tpdeny",
      "/home",
      "/sethome",
      "/delhome",
      "/warp <name>",
    ],
    accentTier: "neutral",
  },
  {
    id: "media",
    name: "MEDIA",
    weight: "2",
    isFree: false,
    diamonds: 100,
    netherite: 5,
    summary: "Recognition tier built for active creators, showcase builders, and community contributors across the realm.",
    features: [
      "Includes all Default rank travel & messaging perks",
      "Priority recognition across community events",
      "Distinguished Media rank weight & tab display",
      "Creator-ready showcase support on the network",
    ],
    commands: [],
    accentTier: "amber",
  },
  {
    id: "vip",
    name: "VIP",
    weight: "3",
    isFree: false,
    diamonds: 200,
    netherite: 10,
    summary: "Quality-of-life conveniences crafted for dedicated Survival and SkyBlock grinders on the go.",
    features: [
      "Includes all Default & Media utility access",
      "Instant hunger & health restoration anywhere",
      "Portable crafting bench without placing blocks",
      "Remote Ender Chest inventory access on the move",
    ],
    commands: ["/feed", "/heal", "/workbench", "/enderchest"],
    accentTier: "gold",
    featured: true,
  },
  {
    id: "mod",
    name: "MOD",
    weight: "4",
    isFree: false,
    diamonds: 350,
    netherite: 20,
    summary: "Community moderation toolkit equipped to uphold fair play, inspect reports, and keep chat clean.",
    features: [
      "Full player mute, warn, kick & jail enforcement",
      "Stealth vanish & live inventory inspection",
      "SocialSpy oversight for rule-violation checks",
      "Trusted moderation weight across all realms",
    ],
    commands: [
      "/kick <player>",
      "/mute <player>",
      "/tempmute <player> <time>",
      "/warn <player> <reason>",
      "/vanish",
      "/invsee <player>",
      "/socialspy",
      "/jail <player>",
      "/unjail <player>",
    ],
    accentTier: "emerald",
  },
  {
    id: "god",
    name: "GOD",
    weight: "5",
    isFree: false,
    diamonds: 500,
    netherite: 30,
    summary: "High-tier sovereign command suite combining advanced teleportation, invulnerability, and enchantment power.",
    features: [
      "Invulnerability mode & full gamemode switching",
      "Direct player teleportation & summoning",
      "On-demand item spawning & custom enchanting",
      "Complete ban & unban authority tools",
    ],
    commands: [
      "/ban <player>",
      "/tempban <player> <time>",
      "/unban <player>",
      "/gamemode <mode>",
      "/god",
      "/tp <player>",
      "/tphere <player>",
      "/clearinventory <player>",
      "/item <item>",
      "/enchant <enchantment>",
    ],
    accentTier: "royal",
  },
  {
    id: "admin",
    name: "ADMIN",
    weight: "10",
    isFree: false,
    diamonds: 1000,
    netherite: 60,
    summary: "Highest authority rank on KSHyPixel Network with full world environment, warp management, and diagnostic controls.",
    features: [
      "Highest rank weight (10) on the network",
      "Create & manage public server warps",
      "Control world time, weather & mob spawning",
      "Real-time server garbage collection & diagnostics",
    ],
    commands: [
      "/give <player> <item> [amount]",
      "/setwarp <name>",
      "/delwarp <name>",
      "/spawnmob <mob>",
      "/ext <player>",
      "/time <set/add> <value>",
      "/weather <storm/sun>",
      "/gc",
    ],
    accentTier: "crimson",
  },
];
