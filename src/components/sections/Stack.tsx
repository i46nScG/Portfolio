import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { stack, stackCards, stackDetails } from "../../data/stack";
import { Reveal, Stagger, StaggerItem } from "../ui/Motion";
import { Tip } from "../ui/Tip";

function StackMarquee({ reduced }: { reduced: boolean }) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);
    const [groupCount, setGroupCount] = useState(1);

    useLayoutEffect(() => {
        const marquee = marqueeRef.current;
        const track = trackRef.current;
        const group = groupRef.current;
        if (!marquee || !track || !group) return;

        const update = () => {
            const width = group.getBoundingClientRect().width;
            if (!width) return;
            track.style.setProperty("--marquee-loop-width", `${width}px`);
            setGroupCount(reduced ? 1 : Math.ceil(marquee.clientWidth / width) + 1);
        };

        update();
        if (reduced) return;
        const observer = new ResizeObserver(update);
        observer.observe(marquee);
        observer.observe(group);
        return () => observer.disconnect();
    }, [reduced]);

    return (
        <div
            ref={marqueeRef}
            className="stack-marquee marquee mt-10 overflow-hidden"
            aria-label="Technologies I work with"
        >
            <div id="track" ref={trackRef} className="marquee-track px-3">
                {Array.from({ length: groupCount }, (_, g) => (
                    <div
                        key={g}
                        ref={g === 0 ? groupRef : undefined}
                        className="marquee-group"
                        aria-hidden={g === 0 ? undefined : true}
                    >
                        {stack.map((name) => (
                            <Tip key={name} content={stackDetails[name] ?? name}>
                                <span
                                    tabIndex={g === 0 ? 0 : -1}
                                    className="whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3 font-display text-lg font-semibold"
                                >
                                    {name}
                                </span>
                            </Tip>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Stack() {
    const reduced = !!useReducedMotion();

    return (
        <section id="skills" className="page-section stack-section py-20">
            <div className="stack-content mx-auto w-full max-w-6xl px-5">
                <Reveal className="stack-heading">
                    <span className="stack-eyebrow">MY TOOLKIT</span>
                    <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">Stack</h2>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
                        The tools I use to turn ideas into useful things for communities and the
                        web.
                    </p>
                </Reveal>
                <StackMarquee reduced={reduced} />
                <Stagger className="stack-cards mt-8 grid gap-4 sm:grid-cols-3">
                    {stackCards.map((card) => (
                        <StaggerItem key={card.index} as="article" className="stack-card">
                            <span className="stack-card-index">{card.index}</span>
                            <h3>{card.title}</h3>
                            <p>{card.text}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
