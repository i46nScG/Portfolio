import { Fragment, type ReactNode } from "react";
import { email, links } from "../../data/site";
import { projects } from "../../data/projects";
import { Cleared, CmdButton, Note, TermLink } from "./parts";

export interface CommandContext {
    toggleTheme: () => boolean;
}

type CommandBuilder = (ctx: CommandContext) => ReactNode;

export const clearingCommands = new Set(["clear", "cls"]);

const mainCommands = [
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

const helpRows: [string, string][] = [
    ["about", "Background, bio & Harmony Hub"],
    ["projects", "Discord bots & web tools showcase"],
    ["stack", "Runtimes, APIs & language toolkit"],
    ["contact", "Email, Discord server & GitHub"],
    ["hire", "Current availability & role goals"],
    ["setup", "Linux Mint dev environment"],
    ["status", "Current projects & learning focus"],
    ["theme", "Toggle monochrome dark / light"],
    ["clear", "Clear terminal screen"],
];

export const commands: Record<string, CommandBuilder> = {
    about: () => (
        <div className="space-y-1.5 py-0.5 font-mono text-xs">
            <p className="font-sans leading-relaxed text-muted">
                Self-taught developer from Indonesia specializing in Discord bot ecosystems and web
                tools. Coding since middle school starting with JavaScript & Discord.js.
            </p>
            <p className="font-sans leading-relaxed text-muted">
                Founder & sole developer of{" "}
                <span className="font-medium text-ink">Harmony Hub</span>, designing custom Discord
                automations and edge infrastructure. Seeking a first professional engineering role.
            </p>
        </div>
    ),

    anilist: () => (
        <Note>
            <TermLink href={links.anilist}>See my watch list anime/manga!</TermLink>
        </Note>
    ),

    anime: () => (
        <Note>
            Well, well. If you asked, my favorite anime is Overlord. That's the only anime I've ever
            rewatch. The story was interesting. I love overpowered character after all! And Ainz
            seems like unbeateable! And so his subordinates....
        </Note>
    ),

    blog: () => (
        <Note>
            <TermLink href={links.wattpad}>Read my Wattpad!</TermLink>
        </Note>
    ),

    clear: () => <Cleared />,

    cls: () => <Cleared />,

    contact: () => (
        <div className="space-y-1 py-0.5 font-mono text-xs">
            <div className="grid grid-cols-[80px_1fr] gap-y-1 pt-1">
                <span className="text-muted">Email:</span>
                <a
                    className="text-accent underline underline-offset-2 hover:text-ink"
                    href={`mailto:${email}`}
                >
                    {email}
                </a>
                <span className="text-muted">Discord:</span>
                <a
                    className="text-accent underline underline-offset-2 hover:text-ink"
                    href={links.discord}
                    target="_blank"
                    rel="noopener"
                >
                    discord.gg/ZUahYpXXBD
                </a>
                <span className="text-muted">GitHub:</span>
                <a
                    className="text-accent underline underline-offset-2 hover:text-ink"
                    href={links.github}
                    target="_blank"
                    rel="noopener"
                >
                    github.com/i46nScG
                </a>
                <span className="text-muted">Instagram:</span>
                <a
                    className="text-accent underline underline-offset-2 hover:text-ink"
                    href={links.instagram}
                    target="_blank"
                    rel="noopener"
                >
                    @Tokioshy
                </a>
            </div>
        </div>
    ),

    debate: () => (
        <Note>
            Oh I love to debate with people online, when I saw them giving the worst opinion ever or
            I just don't agree with them. You might find me on a random post arguing with random
            people!
        </Note>
    ),

    draw: () => <Note>No I can't.</Note>,

    freetrial: () => <Note>What?</Note>,

    game: () => (
        <Note>
            I recently started to playing Heartopia. You have to check that game. It was fun.
        </Note>
    ),

    help: () => {
        const funCommands = Object.keys(commands)
            .filter((cmd) => !mainCommands.includes(cmd))
            .sort();

        return (
            <div className="space-y-2 py-0.5 font-mono text-xs">
                <div className="grid grid-cols-[105px_1fr] gap-x-2 gap-y-1">
                    {helpRows.map(([name, text]) => (
                        <Fragment key={name}>
                            <span className="font-semibold text-accent">
                                <CmdButton name={name} className="hover:underline" />
                            </span>
                            <span className="text-muted">{text}</span>
                        </Fragment>
                    ))}
                </div>
                <div className="border-t border-line/50 pt-1 text-[11px] text-muted/80">
                    Fun:{" "}
                    {funCommands.map((cmd, i) => (
                        <Fragment key={cmd}>
                            {i > 0 && ", "}
                            <CmdButton name={cmd} className="text-accent hover:underline" />
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    },

    hire: () => (
        <Note>
            Open to junior engineering roles (frontend/backend/full-stack) and custom Discord bot
            development. Reach out via email or Discord.
        </Note>
    ),

    location: () => <Note>Bandung, Indonesia.</Note>,

    manga: () => (
        <Note>
            I don't really read manga actually. Most of the time, I read Manhwa. But, if you really
            want to know what's my favorite manga, probably it's The Eminence in Shadow. I always
            waiting for the next chapter each month... Which isn't really great. Manhwa gives 1
            chapter per week, which is more easier to enjoy. So yeah.
        </Note>
    ),

    music: () => (
        <Note>
            My favorite music? Umm... I don't really have any. As long it sounds good in my ears, I
            keep listening to it. Genre? Hmmm... I don't know anything about genre. Just like what I
            just said. As long it sounds good, it is good, no matter what's the genre. Well if you
            really wanted to know what is the music I keep playing all over the time, a lot by
            21Savage. Sometimes I just open Spotify and click a lot, then let spotify decide what's
            next.
        </Note>
    ),

    politics: () => (
        <Note>
            It is important to keep your eyes on politics. Everything runs under politics. Keep your
            eyes on them. Speak up if feel their policy isn't right or against what the people want.
        </Note>
    ),

    projects: () => (
        <div className="space-y-2 py-0.5 font-mono text-xs">
            <div className="font-semibold text-ink">FEATURED PROJECTS ({projects.length})</div>
            <div className="space-y-2">
                {projects.map((p) => (
                    <div key={p.name} className="space-y-0.5 border-l-2 border-line/80 py-0.5 pl-2">
                        <div className="flex items-center gap-2">
                            <a
                                className="font-semibold text-accent underline underline-offset-2 hover:text-ink"
                                href={p.url}
                                target="_blank"
                                rel="noopener"
                            >
                                {p.name}
                            </a>
                            <span className="text-[10px] text-muted">({p.lang})</span>
                            <span className="rounded border border-line bg-surface px-1 font-mono text-[9px] uppercase tracking-wider text-ink">
                                {p.tag}
                            </span>
                        </div>
                        <div className="text-[11px] leading-tight text-muted">{p.desc}</div>
                        <div className="font-mono text-[10px] text-muted/70">↳ {p.footer}</div>
                    </div>
                ))}
            </div>
            <div className="pt-1 text-[11px] text-muted">
                View full Discord embeds in the{" "}
                <a
                    className="text-accent underline underline-offset-2 hover:text-ink"
                    href="#projects"
                >
                    Projects section ↗
                </a>
            </div>
        </div>
    ),

    quote: () => <Note>Don't waste it for something you don't want to be.</Note>,

    setup: () => (
        <Note>
            Linux Mint as primary daily driver OS. VS Code, Git, Bash terminal, Helium web browser,
            ChatGPT, Gemini, Claude.
        </Note>
    ),

    skills: () => <Note>Speaking.</Note>,

    stack: () => (
        <div className="space-y-1.5 py-0.5 font-mono text-xs">
            <div className="grid grid-cols-[90px_1fr] gap-y-1 pt-1">
                <span className="text-muted">Languages:</span>
                <span className="text-ink">JavaScript (ESNext), TypeScript, PHP, CSS</span>
                <span className="text-muted">Ecosystem:</span>
                <span className="text-ink">Discord.js (v13 & v14), Tailwind CSS, CI4</span>
                <span className="text-muted">Cloud/Edge:</span>
                <span className="text-ink">Cloudflare Workers (HTTP Interactions), Node.js</span>
                <span className="text-muted">OS / Tools:</span>
                <span className="text-ink">Linux Mint, Git, VS Code, Bash</span>
            </div>
        </div>
    ),

    status: () => (
        <Note>
            Maintaining Harmony Hub bot infrastructure, experimenting with Rust, and refining
            TypeScript Discord patterns.
        </Note>
    ),

    theme: ({ toggleTheme }) => <Note>Theme set to {toggleTheme() ? "dark" : "light"}.</Note>,

    youtube: () => <Note>I'm not a YouTuber.</Note>,
};

export const commandNames = [
    ...mainCommands,
    ...Object.keys(commands)
        .filter((cmd) => !mainCommands.includes(cmd))
        .sort(),
];
