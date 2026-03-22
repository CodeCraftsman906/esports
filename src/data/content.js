export const SPONSORS = [
  { id: "s1", name: "NexaGear", logo: "🎮", tier: "platinum", website: "#" },
  { id: "s2", name: "VoltEnergy", logo: "⚡", tier: "gold", website: "#" },
  { id: "s3", name: "ShadowTech", logo: "💻", tier: "gold", website: "#" },
  { id: "s4", name: "FragZone", logo: "🎯", tier: "silver", website: "#" },
  { id: "s5", name: "PixelPulse", logo: "🟣", tier: "silver", website: "#" },
  { id: "s6", name: "ArenaX", logo: "🏟️", tier: "bronze", website: "#" },
];

export const FAQS = [
  { id: "f1", question: "When does registration close?", answer: "Registration closes 48 hours before the tournament starts. Make sure to register early to secure your slot!", category: "registration" },
  { id: "f2", question: "How do I receive my Team ID / UID?", answer: "After successful payment, a unique Team ID or UID is automatically generated and sent to your registered email address.", category: "registration" },
  { id: "f3", question: "Are refunds available?", answer: "Refunds are available up to 72 hours before the event. After that, no refunds will be processed. Contact support for any issues.", category: "payment" },
  { id: "f4", question: "What payment methods are accepted?", answer: "We accept UPI (GPay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, and all major payment gateways.", category: "payment" },
  { id: "f5", question: "Can I change my team members after registration?", answer: "Team member changes can be made up to 24 hours before the event. Submit a request through the admin panel or contact support.", category: "teams" },
  { id: "f6", question: "What devices are supported for mobile games?", answer: "Any Android or iOS device can participate. However, ensure your device meets the minimum requirements for smooth gameplay.", category: "technical" },
  { id: "f7", question: "How will match results be recorded?", answer: "All match results must be submitted with screenshots as proof within 15 minutes of match completion.", category: "gameplay" },
  { id: "f8", question: "What happens in case of a disconnect?", answer: "If a player disconnects due to technical issues, a maximum of 5 minutes wait time is allowed. After that, the match continues.", category: "gameplay" },
];

export const RULES = {
  general: [
    "All participants must register before the deadline.",
    "Cheating, hacking, or use of unauthorized tools results in immediate disqualification.",
    "Respect all players, admins, and officials. Toxic behavior will result in a ban.",
    "All decisions made by tournament admins are final.",
    "Players must be present at the scheduled time or forfeit their match.",
    "Any form of collusion between teams will result in disqualification of both teams.",
  ],
  bgmi: [
    "Squad size: maximum 5 players.",
    "Matches will be played in TPP mode unless otherwise specified.",
    "Points system: Kill points + placement points.",
    "Custom room IDs will be shared 15 minutes before match time.",
    "Screen recording of gameplay is mandatory as proof.",
  ],
  ff: [
    "Squad size: maximum 5 players.",
    "Battle Royale mode on Bermuda map.",
    "Custom room created by admin — join with provided ID and password.",
    "Top 3 placements and kill count determine winners.",
  ],
  "clash-royale": [
    "Solo: 1v1 ladder-style knockout.",
    "Duo: 2v2 team battles.",
    "All card levels allowed — no restrictions.",
    "Best of 3 format for all rounds except finals (Best of 5).",
  ],
  codm: [
    "Squad size: maximum 5 players.",
    "Hardpoint/Search & Destroy rotation.",
    "No operator skill restrictions in BR mode.",
    "Loadouts must be set before match start.",
  ],
  cs2: [
    "Solo or squad up to 6 players.",
    "Competitive mode, standard ruleset.",
    "Private server details shared 30 minutes before match.",
    "Anti-cheat software must be active and verified.",
    "Matches are Best of 24 rounds.",
  ],
  "fall-guys": [
    "Solo participation only.",
    "Top 3 finishers in each heat advance.",
    "Random show selection by tournament admins.",
    "All cosmetics allowed — no gameplay advantage items.",
  ],
  "smash-karts": [
    "Solo participation only.",
    "Points-based system across 5 races.",
    "Private lobby link shared before match time.",
    "No intentional griefing outside normal gameplay.",
  ],
  "pokemon-unite": [
    "Squad size: maximum 6 players.",
    "Standard competitive ruleset applies.",
    "Holowear and battle items allowed per standard rules.",
    "Pokémon bans may apply in later rounds.",
    "Best of 3 format.",
  ],
};

export const EVENTS = [
  { id: "e1", title: "Registration Opens", date: "2025-07-01", time: "10:00 AM", description: "All registrations go live!", type: "registration" },
  { id: "e2", title: "Registration Closes", date: "2025-07-10", time: "11:59 PM", description: "Last chance to register!", type: "deadline" },
  { id: "e3", title: "Bracket Announcement", date: "2025-07-12", time: "06:00 PM", description: "Match brackets revealed on Discord", type: "announcement" },
  { id: "e4", title: "BGMI Qualifiers", date: "2025-07-15", time: "02:00 PM", description: "BGMI Group Stage begins", type: "match" },
  { id: "e5", title: "FF & COD Qualifiers", date: "2025-07-16", time: "03:00 PM", description: "Free Fire and COD Mobile qualifiers", type: "match" },
  { id: "e6", title: "CS2 & Clash Royale Day", date: "2025-07-17", time: "01:00 PM", description: "PC/Strategy games day", type: "match" },
  { id: "e7", title: "Semi Finals", date: "2025-07-19", time: "04:00 PM", description: "Top teams battle for the finals spot", type: "match" },
  { id: "e8", title: "GRAND FINALS", date: "2025-07-20", time: "06:00 PM", description: "The ultimate showdown — Champions crowned!", type: "finals" },
];
