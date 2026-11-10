const projects = [
    {
        name: "Leteshia",
        lang: "JavaScript",
        type: "bots",
        url: "https://github.com/i46nScG/Leteshia",
        desc: "Utility and administration bot developed exclusively to support the operations of the Harmony Hub server.",
    },
    {
        name: "Kaede",
        lang: "JavaScript",
        type: "bots",
        url: "https://github.com/i46nScG/Kaede",
        desc: "A versatile, feature-rich Discord bot framework with utilities for moderation, utility and entertainment.",
    },
    {
        name: "Reine",
        lang: "JavaScript",
        type: "bots",
        url: "https://github.com/i46nScG/Reine",
        desc: "A lightweight, serverless Discord bot built natively on Cloudflare Workers using HTTP Interactions.",
    },
    {
        name: "Yokobee",
        lang: "TypeScript",
        type: "bots",
        url: "https://github.com/i46nScG/Yokobee",
        desc: "A dedicated space for transitioning bot development workflows into TypeScript.",
    },
    {
        name: "Little Notes",
        lang: "TypeScript",
        type: "web",
        url: "https://github.com/i46nScG/Little-Notes",
        desc: "A quiet, private space for your thoughts. Create and manage notes saved locally on your device.",
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
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        burger.focus();
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
        .map(
            (p, i) => `
    <article data-reveal="scale" style="--d:${i * 0.06}s" class="card relative flex flex-col rounded-2xl border border-line bg-surface p-6 ${i === 0 && active === "all" ? "lg:col-span-2" : ""}">
      <div class="flex items-center justify-between text-sm text-muted">
        <span class="flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-soft"></i>${p.lang}</span>
        <span>${typeLabel[p.type]}</span>
      </div>
      <h3 class="mt-5 font-display ${i === 0 && active === "all" ? "text-4xl" : "text-2xl"} font-bold tracking-tight">${p.name}</h3>
      <p class="mt-3 flex-1 leading-relaxed text-muted">${p.desc}</p>
      <a href="${p.url}" target="_blank" rel="noopener" class="card-link mt-6 inline-flex w-fit items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline">View on GitHub <span aria-hidden="true">↗</span></a>
    </article>`,
        )
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
    `<a class="text-accent underline underline-offset-2" href="${h}" target="_blank" rel="noopener">${t}</a>`;

const commands = {
    about() {
        line(
            "Developer from Indonesia. Builds Discord bots and web tools. Runs Harmony Hub. Looking for a first professional role.",
        );
    },

    anilist() {
        line(link("anilist.com/Tokioshy", "https://anilist.co/user/Tokioshy/"));
    },

    anime() {
        line(
            "Well, well. If you asked, my favorite anime is Overlord. That's the only anime I've ever rewatch. The story was interesting. I love overpowered character after all! And Ainz seems like unbeateable! And so his subordinates...",
        );
    },

    blog() {
        line(
            link(
                "Read my Wattpad!",
                "https://www.wattpad.com/story/419164778-the-women-between-two-hearts",
            ),
        );
    },

    clear() {
        out.innerHTML = "";
    },

    cls() {
        out.innerHTML = "";
    },

    contact() {
        line(
            [
                link(email, `mailto:${email}`),
                link("github.com/i46nScG", "https://github.com/i46nScG"),
                link("linktr.ee/Tokioshy", "https://linktr.ee/Tokioshy"),
            ].join("<br>"),
        );
    },

    debate() {
        line(
            "Oh I love to debate with people online, when I saw them giving the worst opinion ever or I just don't agree with them. You might find me on a random post arguing with random people!",
        );
    },

    draw() {
        line("No I can't.");
    },

    freetrial() {
        line("What?");
    },

    game() {
        line("I recently started to playing Heartopia. You have to check that game. It was fun.");
    },

    help() {
        line(
            "Commands: /about /anilist /anime /blog /clear /cls /contact /debate /draw /freetrial /game /help /hire /location /manga /music /politics /projects /quote /setup /skills /stack /status /theme /youtube",
        );
    },

    hire() {
        line("I am open to hire. Contact me via Email or join my Discord.");
    },

    location() {
        line("Bandung, Indonesia.");
    },

    manga() {
        line(
            "I don't really read manga actually. Most of the time, I read Manhwa. But, if you really want to know what's my favorite manga, probably it's The Eminence in Shadow. I always waiting for the next chapter each month... Which isn't really great. Manhwa gives 1 chapter per week, which is more easier to enjoy. So yeah.",
        );
    },

    music() {
        line(
            "My favorite music? Umm... I don't really have any. As long it sounds good in my ears, I keep listening to it. Genre? Hmmm... I don't know anything about genre. Just like what I just said. As long it sounds good, it is good, no matter what's the genre. Well if you really wanted to know what is the music I keep playing all over the time, a lot by 21Savage. Sometimes I just open Spotify and click a lot, then let spotify decide what's next.",
        );
    },

    politics() {
        line(
            "It is important to keep your eyes on politics. Everything runs under politics. Keep your eyes on them. Speak up if feel their policy isn't right or against what the people want.",
        );
    },

    projects() {
        line(
            projects
                .map((project) => `${link(project.name, project.url)} (${project.lang})`)
                .join("<br>"),
        );
    },

    quote() {
        line("Don't waste it for something you don't want to be.");
    },

    setup() {
        line("I use Linux Mint.");
    },

    skills() {
        line("Speaking.");
    },

    stack() {
        line(stack.join(", "));
    },

    status() {
        line("Learning Rust... Completing my plan to watch anime list.");
    },

    theme() {
        line(`Theme set to ${toggleTheme() ? "dark" : "light"}.`);
    },

    youtube() {
        line("I'm not a YouTuber.");
    },
};
function run(raw) {
    const name = raw.trim().replace(/^\//, "").toLowerCase();
    if (!name) return;
    const echo = line("", "text-ink");
    echo.textContent = "/" + name;
    (commands[name] || (() => line("Unknown command. Type /help.", "text-soft")))();
}
line("Tap a command below or type one. Start with /help.");
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
commandForm.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
    updateCommandBadge();
});
document
    .querySelectorAll("[data-cmd]")
    .forEach((b) => b.addEventListener("click", () => run(b.dataset.cmd)));

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
