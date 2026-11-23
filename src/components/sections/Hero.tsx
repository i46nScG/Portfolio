import { useReducedMotion } from "framer-motion";
import { email, roles } from "../../data/site";
import { useTyped } from "../../hooks/useTyped";
import { Rise } from "../ui/Motion";
import { HeroTerminal } from "../terminal/HeroTerminal";

export function Hero() {
    const reduced = !!useReducedMotion();
    const typed = useTyped(roles, reduced);

    return (
        <section
            id="home"
            className="page-section hero-section relative overflow-hidden px-5 pb-20 pt-32 md:pt-40"
        >
            <div className="hero-grid" aria-hidden="true" />
            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
                <div>
                    <Rise className="hero-status">
                        <span className="status-dot" />
                        <span>INDONESIA</span>
                        <span className="status-divider">/</span>
                        <span>OPEN TO OPPORTUNITIES</span>
                    </Rise>
                    <Rise
                        as="h1"
                        delay={0.05}
                        className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        Hi, I'm Tokioshy.
                    </Rise>
                    <Rise
                        as="p"
                        delay={0.2}
                        className="mt-4 font-display text-2xl font-semibold text-muted sm:text-3xl"
                    >
                        I build <span className="text-accent">{typed}</span>
                        <span className="caret" />
                    </Rise>
                    <Rise
                        as="p"
                        delay={0.35}
                        className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
                    >
                        Developer from Indonesia making Discord bots and web tools. I started with
                        JavaScript in middle school, and I'm now looking for my first professional
                        role.
                    </Rise>
                    <Rise delay={0.5} className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#projects"
                            className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/40"
                        >
                            See projects
                        </a>
                        <a
                            href={`mailto:${email}`}
                            className="rounded-full border border-line bg-surface px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-accent"
                        >
                            Email me
                        </a>
                    </Rise>
                    <Rise delay={0.62} className="hero-footnote">
                        <span className="hero-footnote-line" />
                        <span>BUILDING THINGS FOR THE WEB & DISCORD</span>
                    </Rise>
                </div>
                <HeroTerminal />
            </div>
        </section>
    );
}
