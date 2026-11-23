import { useState } from "react";
import { showcase, type ShowcaseItem } from "../../data/showcase";
import { Modal } from "../ui/Modal";
import { Reveal } from "../ui/Motion";
import { TiltCard } from "../ui/TiltCard";
import { motion } from "framer-motion";

export function Showcase() {
    const [selected, setSelected] = useState<ShowcaseItem | null>(null);

    return (
        <section id="showcase" className="page-section showcase-section px-5 py-20">
            <div className="mx-auto w-full min-w-0 max-w-6xl">
                <Reveal>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        GALLERY
                    </span>
                    <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
                        Showcase
                    </h2>
                </Reveal>
                <div className="mt-10 grid w-full min-w-0 max-w-full grid-cols-1 gap-6 md:grid-cols-2">
                    {showcase.map((item, i) => (
                        <Reveal
                            key={item.title}
                            variant="scale"
                            delay={0.05 + i * 0.07}
                            className="min-w-0"
                        >
                            <TiltCard
                                className="card showcase-card relative flex h-full w-full min-w-0 max-w-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-4 text-center sm:p-6"
                                onClick={(e) => {
                                    if ((e.target as HTMLElement).closest("button")) return;
                                    setSelected(item);
                                }}
                            >
                                <h3 className="break-words font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                                    {item.title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setSelected(item)}
                                    aria-label={`Preview ${item.title}`}
                                    className="my-4 aspect-square w-full max-w-full overflow-hidden rounded-xl border border-line/70 bg-bg/40"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                    />
                                </button>
                                <p className="break-words font-sans text-sm leading-relaxed text-muted sm:text-base">
                                    {item.description}
                                </p>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Modal
                open={!!selected}
                onOpenChange={(open) => !open && setSelected(null)}
                title={selected?.title ?? ""}
                description={selected?.description ?? ""}
                size="max-w-xl"
            >
                {selected && (
                    <motion.div className="mt-5 aspect-square w-full overflow-hidden rounded-xl border border-line/70 bg-bg/40">
                        <img
                            src={selected.image}
                            alt={selected.title}
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                )}
            </Modal>
        </section>
    );
}
