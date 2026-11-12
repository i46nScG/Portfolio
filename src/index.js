const projects = [
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
const stack = ["JavaScript", "TypeScript", "PHP", "CSS", "Discord.js", "Cloudflare Workers", "CI4"];
const roles = ["Discord bots", "web tools", "serverless bots", "things in TypeScript"];
const email = "Tokioshy@pm.me";

const $ = (s) => document.querySelector(s);
const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

function toggleTheme() {
    const dark = root.classList.toggle("dark");
    try {
        localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
    return dark;
}
$("#theme").addEventListener("click", toggleTheme);

const menu = $("#menu"),
    burger = $("#burger");
const burgerLines = burger.querySelectorAll("[data-burger-line]");
function setMenuOpen(open) {
    if (!open && menu.contains(document.activeElement)) burger.focus();
    menu.classList.toggle("max-h-64", open);
    menu.classList.toggle("max-h-0", !open);
    menu.classList.toggle("translate-y-0", open);
    menu.classList.toggle("-translate-y-2", !open);
    menu.classList.toggle("opacity-100", open);
    menu.classList.toggle("opacity-0", !open);
    menu.classList.toggle("pointer-events-auto", open);
    menu.classList.toggle("pointer-events-none", !open);
    menu.inert = !open;
    menu.setAttribute("aria-hidden", !open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burgerLines[0].classList.toggle("translate-y-2", open);
    burgerLines[0].classList.toggle("rotate-45", open);
    burgerLines[1].classList.toggle("scale-x-0", open);
    burgerLines[1].classList.toggle("opacity-0", open);
    burgerLines[2].classList.toggle("-translate-y-2", open);
    burgerLines[2].classList.toggle("-rotate-45", open);
}
burger.addEventListener("click", () => {
    setMenuOpen(burger.getAttribute("aria-expanded") !== "true");
});
menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (burger.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            burger.focus();
            return;
        }
        const activeEl = document.activeElement;
        if (activeEl && activeEl.id === "cmdInput") {
            activeEl.blur();
            return;
        }
    }

    if (e.key === "/") {
        const active = document.activeElement;
        const isEditable =
            active &&
            (active.isContentEditable || /^(input|textarea|select)$/i.test(active.tagName));
        if (isEditable) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        e.preventDefault();

        if (burger.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
        }

        const terminalWrap = document.querySelector(".hero-terminal-wrap");
        if (terminalWrap) {
            terminalWrap.scrollIntoView({
                behavior: reduced ? "auto" : "smooth",
                block: "center",
            });
        }

        const termInput = document.getElementById("cmdInput");
        if (termInput) {
            termInput.focus({ preventScroll: true });
        }

        const termWindow = document.querySelector(".terminal-window");
        if (termWindow) {
            termWindow.classList.remove("terminal-focus-flash");
            void termWindow.offsetWidth;
            termWindow.classList.add("terminal-focus-flash");
        }
    }
});

const bar = $("#bar"),
    nav = $("#nav");
const sectionLinks = document.querySelectorAll(".section-nav-link");
const pageSections = [...document.querySelectorAll("main > .page-section")];
const sectionAliases = new Map([
    ["top", "home"],
    ["stack", "skills"],
]);
const sectionIndexForHash = (hash) => {
    const id = sectionAliases.get(hash.replace(/^#/, "")) || hash.replace(/^#/, "");
    return pageSections.findIndex((section) => section.id === id);
};
const getCleanUrl = () => location.pathname + location.search;
let currentSectionIndex = Math.max(
    sectionIndexForHash(location.hash),
    typeof history.state?.sectionIndex === "number" ? history.state.sectionIndex : 0,
    0,
);
if (location.hash) {
    history.replaceState({ sectionIndex: currentSectionIndex }, "", getCleanUrl());
} else if (!history.state) {
    history.replaceState({ sectionIndex: currentSectionIndex }, "", getCleanUrl());
}

function updateNavigationState() {
    const viewportCenter = innerHeight / 2;
    const activeSection = pageSections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportCenter && bounds.bottom > viewportCenter;
    });
    if (activeSection) currentSectionIndex = pageSections.indexOf(activeSection);

    const maxScroll = root.scrollHeight - innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    bar.style.transform = `scaleX(${progress})`;
    nav.classList.toggle("border-transparent", scrollY <= 10);
    nav.classList.toggle("border-line", scrollY > 10);
    nav.classList.toggle("bg-bg/70", scrollY > 10);
    sectionLinks.forEach((link) => {
        if (sectionIndexForHash(link.hash) === currentSectionIndex) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}
addEventListener("scroll", updateNavigationState, { passive: true });
addEventListener("resize", updateNavigationState, { passive: true });
updateNavigationState();

if (currentSectionIndex > 0) {
    requestAnimationFrame(() => {
        pageSections[currentSectionIndex]?.scrollIntoView({ behavior: "instant" });
    });
}

document.addEventListener("click", (event) => {
    const anchor = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
    if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target
    ) {
        return;
    }
    const index = sectionIndexForHash(anchor.hash);
    if (index < 0) return;
    event.preventDefault();
    if (index !== currentSectionIndex)
        history.pushState({ sectionIndex: index }, "", getCleanUrl());
    currentSectionIndex = index;
    updateNavigationState();
    pageSections[index]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});

addEventListener("popstate", (event) => {
    const targetIndex =
        typeof event.state?.sectionIndex === "number" ? event.state.sectionIndex : 0;
    if (targetIndex === currentSectionIndex) return;
    currentSectionIndex = targetIndex;
    updateNavigationState();
    pageSections[targetIndex]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});

addEventListener("hashchange", () => {
    const index = sectionIndexForHash(location.hash);
    if (location.hash) {
        history.replaceState({ sectionIndex: Math.max(index, 0) }, "", getCleanUrl());
    }
    if (index < 0) return;
    currentSectionIndex = index;
    updateNavigationState();
    pageSections[index]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});

const loader = $("#loader");
function revealPage() {
    document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
            loader.classList.add("is-hidden");
            root.classList.remove("is-loading");
            setTimeout(() => loader.remove(), 400);
        });
    });
}
if (document.readyState === "complete") {
    revealPage();
} else {
    addEventListener("load", revealPage, { once: true });
}

if (finePointer && !reduced) {
    addEventListener(
        "pointermove",
        (e) => {
            root.style.setProperty("--mx", e.clientX + "px");
            root.style.setProperty("--my", e.clientY + "px");
        },
        { passive: true },
    );
}

const typed = $("#typed");
if (reduced) {
    typed.textContent = roles[0];
} else {
    let r = 0,
        c = 0,
        del = false;
    (function tick() {
        const word = roles[r];
        typed.textContent = word.slice(0, c);
        if (!del && c === word.length) {
            del = true;
            return setTimeout(tick, 1600);
        }
        if (del && c === 0) {
            del = false;
            r = (r + 1) % roles.length;
            return setTimeout(tick, 350);
        }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 35 : 80);
    })();
}

const grid = $("#grid"),
    filters = $("#filters");
const filterDefs = [
    ["all", "All"],
    ["bots", "Discord bots"],
    ["web", "Web apps"],
];
const typeLabel = { bots: "Discord bot", web: "Web app" };
let active = "all";

function renderFilters() {
    filters.innerHTML = filterDefs
        .map(
            ([k, l]) =>
                `<button data-f="${k}" aria-pressed="${k === active}" class="rounded-full border px-4 py-1.5 text-sm font-medium transition ${k === active ? "border-accent bg-accent text-bg" : "border-line bg-surface hover:border-accent"}">${l}</button>`,
        )
        .join("");
}
function renderProjects() {
    const list = projects.filter((p) => active === "all" || p.type === active);
    grid.innerHTML = list
        .map((p, i) => {
            const isBot = p.type === "bots";
            const repoSlug = p.url.replace(/^https?:\/\/github\.com\//i, "");
            const metaItems = (p.meta || [])
                .map(
                    (m) => `
                <div class="space-y-0.5 min-w-0">
                    <span class="block truncate font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">${m.label}</span>
                    <span class="block truncate font-mono text-xs font-medium text-ink">${m.value}</span>
                </div>`,
                )
                .join("");

            if (isBot) {
                return `
                <article data-reveal="scale" style="--d:${i * 0.05}s" class="card relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-4 sm:p-6 transition hover:border-accent/60 w-full max-w-full min-w-0">
                    <div class="min-w-0">
                        <!-- Author Header (Discord Bot Identity) -->
                        <div class="flex items-center justify-between border-b border-line/60 pb-3 gap-2 min-w-0">
                            <div class="flex items-center gap-2 min-w-0 flex-1">
                                <div class="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg font-mono text-xs font-bold text-ink">
                                    ${p.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div class="flex items-center gap-1.5 min-w-0">
                                    <h3 class="font-display text-base font-bold text-ink truncate">${p.name}</h3>
                                    <span class="shrink-0 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-bg">APP</span>
                                </div>
                                <span class="hidden font-mono text-[11px] text-muted/70 sm:inline truncate">${p.status}</span>
                            </div>
                            <span class="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-bg/50 px-2.5 py-0.5 font-mono text-xs text-muted">
                                <span class="h-1.5 w-1.5 rounded-full bg-soft"></span>
                                ${p.lang}
                            </span>
                        </div>

                        <!-- Discord Embed Container -->
                        <div class="mt-4 space-y-3 rounded-l-sm rounded-r-xl border border-line/70 border-l-[3.5px] border-l-ink bg-bg/40 p-3.5 sm:p-4 dark:border-l-ink min-w-0 max-w-full">
                            <div class="flex items-center gap-1.5 font-mono text-xs text-muted min-w-0">
                                <span class="font-semibold text-accent">/</span>
                                <span class="font-semibold text-ink truncate">${p.name.toLowerCase()}</span>
                                <span class="text-muted/60 shrink-0">— overview</span>
                            </div>

                            <p class="text-sm font-medium leading-relaxed text-ink break-words">${p.desc}</p>

                            <!-- Proof of Work & Technical Hurdle -->
                            <div class="rounded-lg border border-line/60 bg-surface/90 p-3 min-w-0">
                                <div class="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                                    <svg class="h-3 w-3 shrink-0 text-ink" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <span class="truncate">Proof of Work &amp; Architecture</span>
                                </div>
                                <p class="mt-1 font-sans text-xs leading-relaxed text-muted break-words">${p.proof}</p>
                            </div>

                            <!-- Structured Field Layout -->
                            <div class="grid grid-cols-2 gap-2.5 pt-1 sm:grid-cols-3 min-w-0">
                                ${metaItems}
                            </div>

                            <!-- Embed Footer -->
                            <div class="flex items-center justify-between gap-2 border-t border-line/50 pt-2 font-mono text-[11px] text-muted min-w-0">
                                <span class="truncate min-w-0" title="${p.footer}">${p.footer}</span>
                                <span class="shrink-0 text-[10px]">Verified</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Actions -->
                    <div class="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-3 min-w-0">
                        <a href="${p.url}" target="_blank" rel="noopener" class="card-link shrink-0 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent underline-offset-4 hover:underline">
                            <span>Inspect Source</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                        <span class="font-mono text-[11px] text-muted/70 truncate min-w-0">github.com/${repoSlug}</span>
                    </div>
                </article>`;
            } else {
                const previewUrl =
                    p.previewUrl ||
                    "https://" + p.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".local";
                const previewBadge = p.previewBadge || "client-only";
                return `
                <article data-reveal="scale" style="--d:${i * 0.05}s" class="card relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-4 sm:p-6 transition hover:border-accent/60 w-full max-w-full min-w-0">
                    <div class="min-w-0">
                        <!-- Author Header (Web Tool Identity) -->
                        <div class="flex items-center justify-between border-b border-line/60 pb-3 gap-2 min-w-0">
                            <div class="flex items-center gap-2 min-w-0 flex-1">
                                <div class="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg font-mono text-xs font-bold text-ink">
                                    ${p.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div class="flex items-center gap-1.5 min-w-0">
                                    <h3 class="font-display text-base font-bold text-ink truncate">${p.name}</h3>
                                    <span class="shrink-0 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-muted">WEB</span>
                                </div>
                                <span class="hidden font-mono text-[11px] text-muted/70 sm:inline truncate">${p.status}</span>
                            </div>
                            <span class="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-bg/50 px-2.5 py-0.5 font-mono text-xs text-muted">
                                <span class="h-1.5 w-1.5 rounded-full bg-soft"></span>
                                ${p.lang}
                            </span>
                        </div>

                        <!-- Web Inspector Container -->
                        <div class="mt-4 space-y-3 rounded-xl border border-line/70 bg-bg/40 p-3.5 sm:p-4 min-w-0 max-w-full">
                            <div class="flex items-center justify-between gap-2 rounded-lg border border-line/60 bg-surface/90 px-3 py-1.5 font-mono text-xs text-muted min-w-0">
                                <div class="flex items-center gap-2 min-w-0 flex-1">
                                    <span class="h-2 w-2 shrink-0 rounded-full bg-soft"></span>
                                    <span class="text-ink truncate min-w-0">${previewUrl}</span>
                                </div>
                                <a href="${previewUrl}" target="_blank" rel="noopener" class="ml-2 shrink-0 text-[10px] text-muted hover:text-accent hover:underline">${previewBadge}</a>
                            </div>

                            <p class="text-sm font-medium leading-relaxed text-ink break-words">${p.desc}</p>

                            <!-- Proof of Work & Technical Hurdle -->
                            <div class="rounded-lg border border-line/60 bg-surface/90 p-3 min-w-0">
                                <div class="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                                    <svg class="h-3 w-3 shrink-0 text-ink" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <span class="truncate">Privacy &amp; Offline Architecture</span>
                                </div>
                                <p class="mt-1 font-sans text-xs leading-relaxed text-muted break-words">${p.proof}</p>
                            </div>

                            <!-- Structured Field Layout -->
                            <div class="grid grid-cols-2 gap-2.5 pt-1 sm:grid-cols-3 min-w-0">
                                ${metaItems}
                            </div>

                            <!-- Embed Footer -->
                            <div class="flex items-center justify-between gap-2 border-t border-line/50 pt-2 font-mono text-[11px] text-muted min-w-0">
                                <span class="truncate min-w-0" title="${p.footer}">${p.footer}</span>
                                <span class="shrink-0 text-[10px]">Zero Telemetry</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Actions -->
                    <div class="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-3 min-w-0">
                        <a href="${p.url}" target="_blank" rel="noopener" class="card-link shrink-0 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent underline-offset-4 hover:underline">
                            <span>Inspect Source</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                        <span class="font-mono text-[11px] text-muted/70 truncate min-w-0">github.com/${repoSlug}</span>
                    </div>
                </article>`;
            }
        })
        .join("");
    grid.querySelectorAll("[data-reveal]").forEach((el) =>
        requestAnimationFrame(() => el.classList.add("in")),
    );
    if (finePointer && !reduced) grid.querySelectorAll(".card").forEach(tilt);
}
function tilt(card) {
    card.addEventListener("pointermove", (e) => {
        const b = card.getBoundingClientRect(),
            x = e.clientX - b.left,
            y = e.clientY - b.top;
        card.style.setProperty("--gx", x + "px");
        card.style.setProperty("--gy", y + "px");
        card.style.transform = `rotateX(${(y / b.height - 0.5) * -6}deg) rotateY(${(x / b.width - 0.5) * 6}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => {
        card.style.transform = "";
    });
}
filters.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-f]");
    if (!b) return;
    active = b.dataset.f;
    renderFilters();
    renderProjects();
});
renderFilters();
renderProjects();
if (finePointer && !reduced) document.querySelectorAll("#showcase .card").forEach(tilt);

const chips = stack
    .map(
        (s) =>
            `<span class="whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3 font-display text-lg font-semibold">${s}</span>`,
    )
    .join("");
const track = $("#track");
const marquee = track.closest(".marquee");
const marqueeGroup = `<div class="marquee-group">${chips}</div>`;
track.innerHTML = marqueeGroup;

function updateStackMarquee() {
    const groupWidth = track.firstElementChild.getBoundingClientRect().width;
    if (!groupWidth) return;

    track.style.setProperty("--marquee-loop-width", `${groupWidth}px`);

    const groupCount = reduced ? 1 : Math.ceil(marquee.clientWidth / groupWidth) + 1;
    while (track.childElementCount < groupCount) {
        track.insertAdjacentHTML(
            "beforeend",
            `<div class="marquee-group" aria-hidden="true">${chips}</div>`,
        );
    }
    while (track.childElementCount > groupCount) {
        track.lastElementChild.remove();
    }
}

updateStackMarquee();
if (!reduced) {
    const marqueeObserver = new ResizeObserver(updateStackMarquee);
    marqueeObserver.observe(marquee);
    marqueeObserver.observe(track.firstElementChild);
}

const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add("in");
                io.unobserve(en.target);
            }
        });
    },
    { threshold: 0.15 },
);
document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));

const out = $("#out"),
    input = $("#cmdInput");
function line(html, cls = "text-muted") {
    const d = document.createElement("div");
    d.className = cls + " terminal-line";
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
    return d;
}
const link = (t, h) =>
    `<a class="text-accent underline underline-offset-2 hover:text-ink transition" href="${h}" target="_blank" rel="noopener">${t}</a>`;

const cmdHistory = [];
let historyIndex = -1;

const commands = {
    about() {
        line(`
        <div class="space-y-1.5 py-0.5 font-mono text-xs">
            <p class="font-sans leading-relaxed text-muted">Self-taught developer from Indonesia specializing in Discord bot ecosystems and web tools. Coding since middle school starting with JavaScript & Discord.js.</p>
            <p class="font-sans leading-relaxed text-muted">Founder & sole developer of <span class="font-medium text-ink">Harmony Hub</span>, designing custom Discord automations and edge infrastructure. Seeking a first professional engineering role.</p>
        </div>
        `);
    },

    anilist() {
        line(`
            <div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">${link("See my watch list anime/manga!", "https://anilist.co/user/Tokioshy/")}</p>
            </div>
        `);
    },

    anime() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Well, well. If you asked, my favorite anime is Overlord. That's the only anime I've ever rewatch. The story was interesting. I love overpowered character after all! And Ainz seems like unbeateable! And so his subordinates....</p>
            </div>
        `,
        );
    },

    blog() {
        line(`
            <div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">${link("Read my Wattpad!", "https://www.wattpad.com/story/419164778-the-women-between-two-hearts")}</p>
            </div>
        `);
    },

    clear() {
        out.innerHTML = "";
        line(
            `<div class="font-mono text-xs text-muted">Console buffer cleared. Type <button data-cmd="help" class="font-semibold text-accent underline underline-offset-2">/help</button> for commands.</div>`,
        );
    },

    cls() {
        out.innerHTML = "";
        line(
            `<div class="font-mono text-xs text-muted">Console buffer cleared. Type <button data-cmd="help" class="font-semibold text-accent underline underline-offset-2">/help</button> for commands.</div>`,
        );
    },

    contact() {
        line(`
            <div class="space-y-1 py-0.5 font-mono text-xs">
                <div class="grid grid-cols-[80px_1fr] gap-y-1 pt-1">
                    <span class="text-muted">Email:</span><a class="text-accent underline underline-offset-2 hover:text-ink" href="mailto:${email}">${email}</a>
                    <span class="text-muted">Discord:</span><a class="text-accent underline underline-offset-2 hover:text-ink" href="https://discord.gg/ZUahYpXXBD" target="_blank" rel="noopener">discord.gg/ZUahYpXXBD</a>
                    <span class="text-muted">GitHub:</span><a class="text-accent underline underline-offset-2 hover:text-ink" href="https://github.com/i46nScG" target="_blank" rel="noopener">github.com/i46nScG</a>
                    <span class="text-muted">Instagram:</span><a class="text-accent underline underline-offset-2 hover:text-ink" href="https://instagram.com/Tokioshy" target="_blank" rel="noopener">@Tokioshy</a>
                </div>
            </div>
        `);
    },

    debate() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Oh I love to debate with people online, when I saw them giving the worst opinion ever or I just don't agree with them. You might find me on a random post arguing with random people!</p>
            </div>
        `,
        );
    },

    draw() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">No I can't.</p>
            </div>
        `,
        );
    },

    freetrial() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">What?</p>
            </div>
        `,
        );
    },

    game() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">I recently started to playing Heartopia. You have to check that game. It was fun.</p>
            </div>
        `,
        );
    },

    help() {
        const mainCmds = [
            "about",
            "projects",
            "stack",
            "contact",
            "hire",
            "setup",
            "status",
            "theme",
            "clear",
            "help",
        ];
        const funCmds = Object.keys(commands)
            .filter((cmd) => !mainCmds.includes(cmd))
            .sort()
            .map(
                (cmd) =>
                    `<button data-cmd="${cmd}" class="text-accent hover:underline">/${cmd}</button>`,
            )
            .join(", ");

        line(`
            <div class="space-y-2 py-0.5 font-mono text-xs">
                <div class="grid grid-cols-[105px_1fr] gap-x-2 gap-y-1">
                    <span class="font-semibold text-accent"><button data-cmd="about" class="hover:underline">/about</button></span><span class="text-muted">Background, bio & Harmony Hub</span>
                    <span class="font-semibold text-accent"><button data-cmd="projects" class="hover:underline">/projects</button></span><span class="text-muted">Discord bots & web tools showcase</span>
                    <span class="font-semibold text-accent"><button data-cmd="stack" class="hover:underline">/stack</button></span><span class="text-muted">Runtimes, APIs & language toolkit</span>
                    <span class="font-semibold text-accent"><button data-cmd="contact" class="hover:underline">/contact</button></span><span class="text-muted">Email, Discord server & GitHub</span>
                    <span class="font-semibold text-accent"><button data-cmd="hire" class="hover:underline">/hire</button></span><span class="text-muted">Current availability & role goals</span>
                    <span class="font-semibold text-accent"><button data-cmd="setup" class="hover:underline">/setup</button></span><span class="text-muted">Linux Mint dev environment</span>
                    <span class="font-semibold text-accent"><button data-cmd="status" class="hover:underline">/status</button></span><span class="text-muted">Current projects & learning focus</span>
                    <span class="font-semibold text-accent"><button data-cmd="theme" class="hover:underline">/theme</button></span><span class="text-muted">Toggle monochrome dark / light</span>
                    <span class="font-semibold text-accent"><button data-cmd="clear" class="hover:underline">/clear</button></span><span class="text-muted">Clear terminal screen</span>
                </div>
                <div class="border-t border-line/50 pt-1 text-[11px] text-muted/80">
                    Fun: ${funCmds}
                </div>
            </div>
        `);
    },

    hire() {
        line(`
            <div class="space-y-1 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Open to junior engineering roles (frontend/backend/full-stack) and custom Discord bot development. Reach out via email or Discord.</p>
            </div>
        `);
    },

    location() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Bandung, Indonesia.</p>
            </div>
        `,
        );
    },

    manga() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">I don't really read manga actually. Most of the time, I read Manhwa. But, if you really want to know what's my favorite manga, probably it's The Eminence in Shadow. I always waiting for the next chapter each month... Which isn't really great. Manhwa gives 1 chapter per week, which is more easier to enjoy. So yeah.</p>
            </div>
        `,
        );
    },

    music() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">My favorite music? Umm... I don't really have any. As long it sounds good in my ears, I keep listening to it. Genre? Hmmm... I don't know anything about genre. Just like what I just said. As long it sounds good, it is good, no matter what's the genre. Well if you really wanted to know what is the music I keep playing all over the time, a lot by 21Savage. Sometimes I just open Spotify and click a lot, then let spotify decide what's next.</p>
            </div>
        `,
        );
    },

    politics() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">It is important to keep your eyes on politics. Everything runs under politics. Keep your eyes on them. Speak up if feel their policy isn't right or against what the people want.</p>
            </div>
        `,
        );
    },

    projects() {
        const list = projects
            .map(
                (p) => `
                        <div class="border-l-2 border-line/80 py-0.5 pl-2 space-y-0.5">
                            <div class="flex items-center gap-2">
                                <a class="font-semibold text-accent underline underline-offset-2 hover:text-ink" href="${p.url}" target="_blank" rel="noopener">${p.name}</a>
                                <span class="text-[10px] text-muted">(${p.lang})</span>
                                <span class="rounded border border-line bg-surface px-1 text-[9px] font-mono uppercase tracking-wider text-ink">${p.tag}</span>
                            </div>
                            <div class="text-[11px] leading-tight text-muted">${p.desc}</div>
                            <div class="font-mono text-[10px] text-muted/70">↳ ${p.footer}</div>
                        </div>
                `,
            )
            .join("");
        line(`
            <div class="space-y-2 py-0.5 font-mono text-xs">
                <div class="font-semibold text-ink">FEATURED PROJECTS (${projects.length})</div>
                <div class="space-y-2">${list}</div>
                <div class="pt-1 text-[11px] text-muted">View full Discord embeds in the <a class="text-accent underline underline-offset-2 hover:text-ink" href="#projects">Projects section ↗</a></div>
            </div>
        `);
    },

    quote() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Don't waste it for something you don't want to be.</p>
            </div>
        `,
        );
    },

    setup() {
        line(`
        <div class="space-y-1 py-0.5 font-mono text-xs">
            <div class="font-sans leading-relaxed text-muted">Linux Mint as primary daily driver OS. VS Code, Git, Bash terminal, Helium web browser, ChatGPT, Gemini, Claude.</div>
        </div>
        `);
    },

    skills() {
        line(`
        <div class="space-y-1 py-0.5 font-mono text-xs">
            <div class="font-sans leading-relaxed text-muted">Speaking.</div>
        </div>
        `);
    },

    stack() {
        line(`
            <div class="space-y-1.5 py-0.5 font-mono text-xs">
                <div class="grid grid-cols-[90px_1fr] gap-y-1 pt-1">
                    <span class="text-muted">Languages:</span><span class="text-ink">JavaScript (ESNext), TypeScript, PHP, CSS</span>
                    <span class="text-muted">Ecosystem:</span><span class="text-ink">Discord.js (v13 & v14), Tailwind CSS, CI4</span>
                    <span class="text-muted">Cloud/Edge:</span><span class="text-ink">Cloudflare Workers (HTTP Interactions), Node.js</span>
                    <span class="text-muted">OS / Tools:</span><span class="text-ink">Linux Mint, Git, VS Code, Bash</span>
                </div>
            </div>
        `);
    },

    status() {
        line(`
            <div class="space-y-1 py-0.5 font-mono text-xs">
                <div class="font-sans leading-relaxed text-muted">Maintaining Harmony Hub bot infrastructure, experimenting with Rust, and refining TypeScript Discord patterns.</div>
            </div>
        `);
    },

    theme() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">Theme set to ${toggleTheme() ? "dark" : "light"}.</p>
            </div>
        `,
        );
    },

    youtube() {
        line(
            `<div class="space-y-1.5 py-0.5 font-mono text-xs">
                <p class="font-sans leading-relaxed text-muted">I'm not a YouTuber.</p>
            </div>
        `,
        );
    },
};

function run(raw) {
    const name = raw.trim().replace(/^\//, "").toLowerCase();
    if (!name) return;

    if (cmdHistory[cmdHistory.length - 1] !== name) {
        cmdHistory.push(name);
    }
    historyIndex = cmdHistory.length;

    const echo = document.createElement("div");
    echo.className =
        "flex items-center gap-1.5 font-mono text-xs font-semibold text-ink pt-1 terminal-line";
    echo.innerHTML = `<span class="font-semibold text-accent">❯</span><span>/${name}</span>`;
    out.appendChild(echo);

    if (commands[name]) {
        commands[name]();
    } else {
        line(
            `<div class="font-mono text-xs text-soft">zsh: command not found: <span class="text-ink">/${name}</span>. Type <button type="button" data-cmd="help" class="font-semibold text-accent underline underline-offset-2 hover:text-ink">/help</button> for available commands.</div>`,
        );
    }
    out.scrollTop = out.scrollHeight;
}

line(
    `<div class="space-y-1 font-mono text-xs">` +
        `<div class="text-muted">Type <button data-cmd="help" class="font-semibold text-accent underline underline-offset-2">/help</button>, tap chips below, or press <kbd class="rounded border border-line bg-surface px-1 py-0.5 text-[10px] font-semibold text-ink">[/]</kbd> anywhere.</div>` +
        `</div>`,
);

const commandForm = $("#cmd");
const terminalWrap = document.querySelector(".hero-terminal-wrap");
let commandHovered = false;
function updateCommandBadge() {
    terminalWrap.classList.toggle("is-command-active", commandHovered || input.value.length > 0);
}
commandForm.addEventListener("pointerenter", () => {
    commandHovered = true;
    updateCommandBadge();
});
commandForm.addEventListener("pointerleave", () => {
    commandHovered = false;
    updateCommandBadge();
});
input.addEventListener("input", updateCommandBadge);

input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        if (cmdHistory.length > 0) {
            e.preventDefault();
            if (historyIndex > 0) historyIndex--;
            input.value = cmdHistory[historyIndex] || "";
            updateCommandBadge();
        }
    } else if (e.key === "ArrowDown") {
        if (cmdHistory.length > 0) {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                input.value = cmdHistory[historyIndex] || "";
            } else {
                historyIndex = cmdHistory.length;
                input.value = "";
            }
            updateCommandBadge();
        }
    }
});

commandForm.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
    updateCommandBadge();
});

document
    .querySelectorAll("[data-cmd]")
    .forEach((b) => b.addEventListener("click", () => run(b.dataset.cmd)));

out.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cmd]");
    if (b) {
        e.preventDefault();
        run(b.dataset.cmd);
    }
});

const copy = $("#copy");
copy.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(email);
        copy.textContent = "Copied";
    } catch (e) {
        copy.textContent = "Copy failed";
    }
    setTimeout(() => (copy.textContent = "Copy email"), 1800);
});

$("#year").textContent = new Date().getFullYear();
