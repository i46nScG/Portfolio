export type ProjectType = "bots" | "web";

export interface ProjectMeta {
    label: string;
    value: string;
}

export interface Project {
    name: string;
    lang: string;
    status: string;
    type: ProjectType;
    tag: string;
    url: string;
    desc: string;
    proof: string;
    meta: ProjectMeta[];
    footer: string;
    previewUrl?: string;
    previewBadge?: string;
}

export const projects: Project[] = [
    {
        name: "Leteshia",
        lang: "JavaScript",
        status: "side focus",
        type: "bots",
        tag: "Discord Bot",
        url: "https://github.com/i46nScG/Leteshia",
        desc: "Specialized operations and administrative bot engineered exclusively for the Harmony Hub community.",
        proof: "Overcame role-hierarchy race conditions by structuring atomic permission checks and custom ticket dispatch routines, automating server management without third-party bot dependencies.",
        meta: [
            { label: "Guild Target", value: "Harmony Hub" },
            { label: "Engine", value: "Discord.js" },
            { label: "Runtime", value: "Node.js Daemon" },
        ],
        footer: "Harmony Hub Operations • Gateway v10",
    },
    {
        name: "Reine",
        lang: "JavaScript",
        status: "current focus",
        type: "bots",
        tag: "Serverless Bot",
        url: "https://github.com/i46nScG/Reine",
        desc: "Lightweight, serverless Discord bot running natively on Cloudflare Workers using raw HTTP Interactions.",
        proof: "Replaced persistent WebSocket connections with cryptographic Ed25519 signature verification at the edge. Achieved sub-20ms interaction latency with zero idle server cost and no cold starts.",
        meta: [
            { label: "Platform", value: "Cloudflare Workers" },
            { label: "Protocol", value: "HTTP Interactions" },
            { label: "Crypto", value: "Ed25519 Verify" },
        ],
        footer: "Global Edge Runtime • Zero Cold Starts",
    },
    {
        name: "Kaede",
        lang: "JavaScript",
        status: "stale",
        type: "bots",
        tag: "Discord Bot",
        url: "https://github.com/i46nScG/Kaede",
        desc: "Modular, multi-purpose Discord bot framework with unified moderation, audit logging, and utility subsystems.",
        proof: "Architected a decoupled command and event routing bus that isolates administrative moderation utilities from entertainment features, maintaining state across high-traffic channels.",
        meta: [
            { label: "Architecture", value: "Modular Command Bus" },
            { label: "Engine", value: "Discord.js" },
            { label: "Scope", value: "Multi-utility" },
        ],
        footer: "Event-driven Core • Subsystem Isolation",
    },
    {
        name: "Yokobee",
        lang: "TypeScript",
        status: "behind",
        type: "bots",
        tag: "Discord Bot",
        url: "https://github.com/i46nScG/Yokobee",
        desc: "Strict TypeScript architecture migration benchmark for production Discord bot workflows.",
        proof: "Implemented end-to-end type safety across Discord Gateway v10 payloads, custom autocomplete resolvers, and slash command builders, catching schema breaking changes at build time.",
        meta: [
            { label: "Type System", value: "Strict TypeScript" },
            { label: "Gateway", value: "Discord.js" },
            { label: "Pattern", value: "Domain Architecture" },
        ],
        footer: "Type-Safe Schemas • Strict Compiles",
    },
    {
        name: "Little Notes",
        lang: "TypeScript",
        status: "completed",
        type: "web",
        tag: "Web Tool",
        url: "https://github.com/i46nScG/Little-Notes",
        desc: "Minimalist, local-first note application prioritizing privacy, zero telemetry, and instant responsiveness.",
        proof: "Built around client-side local persistence without external tracking or servers. Delivers 0ms offline interaction speed with reactive DOM state updates written in pure TypeScript.",
        meta: [
            { label: "Storage", value: "Local Persistence" },
            { label: "Privacy", value: "100% Client-Side" },
            { label: "Frontend", value: "TypeScript & CSS" },
        ],
        footer: "Zero Telemetry • Offline-First Storage",
        previewUrl: "https://notes.is-local.org/",
        previewBadge: "check it out!",
    },
    {
        name: "Password Generator",
        lang: "JavaScript",
        status: "completed",
        type: "web",
        tag: "Web Tool",
        url: "https://github.com/i46nScG/Password",
        desc: "Fast, client-side password generator delivering cryptographically secure randomized credentials.",
        proof: "Engineered with the Web Crypto API (crypto.getRandomValues) for unbiased entropy. Operates entirely offline with configurable character sets, length parameters, and instant clipboard export.",
        meta: [
            { label: "Entropy", value: "Web Crypto API" },
            { label: "Security", value: "Zero Network Calls" },
            { label: "Frontend", value: "JavaScript & CSS" },
        ],
        footer: "100% Client-Side • Cryptographically Secure",
        previewUrl: "https://quickpasswd.vercel.app/",
        previewBadge: "need password?",
    },
];
