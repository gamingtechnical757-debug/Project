export interface ServerRule {
  number: number;
  emoji: string;
  title: string;
  description: string;
  category: "conduct" | "gameplay" | "safety" | "staff";
}

export const SERVER_RULES: ServerRule[] = [
  {
    number: 1,
    emoji: "🤝",
    title: "Respect Everyone",
    description: "सभी Players, Staff और Community Members का सम्मान करें।",
    category: "conduct",
  },
  {
    number: 2,
    emoji: "🚫",
    title: "No Cheating",
    description: "Hacks, X-Ray, Kill Aura, Auto Clicker या किसी भी unfair client का इस्तेमाल मना है।",
    category: "gameplay",
  },
  {
    number: 3,
    emoji: "🐛",
    title: "No Bug Exploiting",
    description: "Server के Bugs या Glitches का फायदा उठाना मना है। Bug मिलने पर Staff को Report करें।",
    category: "gameplay",
  },
  {
    number: 4,
    emoji: "🏠",
    title: "No Griefing",
    description: "किसी दूसरे Player की Build, Base या Property को बिना Permission नुकसान न पहुँचाएँ।",
    category: "gameplay",
  },
  {
    number: 5,
    emoji: "📦",
    title: "No Stealing",
    description: "दूसरे Players के Chests, Items या Resources चोरी करना मना है।",
    category: "gameplay",
  },
  {
    number: 6,
    emoji: "⚔️",
    title: "No Unfair PvP",
    description: "Spawn Killing, लगातार किसी एक Player को परेशान करना या बिना वजह Target करना मना है।",
    category: "gameplay",
  },
  {
    number: 7,
    emoji: "🏗️",
    title: "Respect Builds",
    description: "दूसरे Players की Builds के पास बिना Permission निर्माण या बदलाव न करें।",
    category: "gameplay",
  },
  {
    number: 8,
    emoji: "💰",
    title: "No Scamming",
    description: "Trading या Deals में जानबूझकर किसी Player को धोखा देना मना है।",
    category: "gameplay",
  },
  {
    number: 9,
    emoji: "📢",
    title: "No Spam",
    description: "Chat में बार-बार Messages, Commands या अनावश्यक Text भेजकर Spam न करें।",
    category: "conduct",
  },
  {
    number: 10,
    emoji: "🔗",
    title: "No Unauthorised Advertising",
    description: "बिना Staff Permission दूसरे Servers, Communities या Websites का Advertisement न करें।",
    category: "conduct",
  },
  {
    number: 11,
    emoji: "🗣️",
    title: "No Toxicity",
    description: "Bullying, Harassment, Threats और जानबूझकर Toxic Behaviour allowed नहीं है।",
    category: "conduct",
  },
  {
    number: 12,
    emoji: "👤",
    title: "No Impersonation",
    description: "Staff या किसी दूसरे Player की पहचान/नाम की नकल करके दूसरों को Mislead न करें।",
    category: "safety",
  },
  {
    number: 13,
    emoji: "🔐",
    title: "Account Safety",
    description: "अपना Account किसी दूसरे व्यक्ति के साथ Share न करें और अपनी Account Security का ध्यान रखें।",
    category: "safety",
  },
  {
    number: 14,
    emoji: "🛡️",
    title: "Respect Staff",
    description: "Staff के साथ सम्मान से व्यवहार करें और उनके उचित Instructions का पालन करें।",
    category: "staff",
  },
  {
    number: 15,
    emoji: "🚫",
    title: "No Punishment Evasion",
    description: "Ban, Mute या किसी अन्य Punishment को Bypass करने के लिए Alternate Account का इस्तेमाल न करें।",
    category: "safety",
  },
  {
    number: 16,
    emoji: "💰",
    title: "No Economy Abuse",
    description: "Duplication, Economy Bugs या किसी भी Exploit से Unfair तरीके से Money/Items प्राप्त करना मना है।",
    category: "gameplay",
  },
  {
    number: 17,
    emoji: "⚙️",
    title: "No Lag Machines",
    description: "ऐसी Farms, Redstone Machines या अन्य Systems न बनाएँ जो Server में जानबूझकर अत्यधिक Lag पैदा करें।",
    category: "gameplay",
  },
  {
    number: 18,
    emoji: "🧑‍💻",
    title: "No Staff Abuse",
    description: "Staff Rank/Commands का इस्तेमाल Personal Advantage, Revenge या Players को परेशान करने के लिए न करें।",
    category: "staff",
  },
  {
    number: 19,
    emoji: "📜",
    title: "Follow Updated Rules",
    description: "Server की जरूरत के अनुसार Rules को Update किया जा सकता है। Updated Rules का पालन करना जरूरी है।",
    category: "staff",
  },
  {
    number: 20,
    emoji: "❤️",
    title: "Have Fun!",
    description: "Fair Play करें, दूसरों का Respect करें और KSHyPixel SMP पर Enjoy करें! 🎮",
    category: "conduct",
  },
];

export const PUNISHMENT_POLICY = {
  heading: "⚠️ PUNISHMENT",
  intro: "Rules तोड़ने पर Situation के अनुसार:",
  steps: [
    "⚠️ Warning",
    "🔇 Mute",
    "👢 Kick",
    "🔨 Temporary Ban",
    "⛔ Permanent Ban",
  ],
  note: "गंभीर मामलों में Staff बिना Warning के भी उचित Punishment दे सकता है।",
  finalMessage: "🎮 PLAY FAIR • HAVE FUN",
};
