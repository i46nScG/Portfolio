import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../../data/projects";
import { filterDefs, links, type ProjectFilter } from "../../data/site";
import { Reveal } from "../ui/Motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";

export function Projects() {
    const [filter, setFilter] = useState<ProjectFilter>("all");
    const [selected, setSelected] = useState<Project | null>(null);

    const visible = projects.filter((p) => filter === "all" || p.type === filter);

    return (
        <section id="projects" className="page-section px-5 py-20">
            <div className="mx-auto w-full min-w-0 max-w-6xl">
                <Tabs.Root value={filter} onValueChange={(v) => setFilter(v as ProjectFilter)}>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <Reveal as="h2" className="font-display text-4xl font-bold tracking-tight">
                            Projects
                        </Reveal>
                        <Tabs.List aria-label="Filter projects" className="flex flex-wrap gap-2">
                            {filterDefs.map(({ value, label }) => (
                                <Tabs.Trigger
                                    key={value}
                                    value={value}
                                    className="relative rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent data-[state=active]:border-accent data-[state=active]:text-bg"
                                >
                                    {filter === value && (
                                        <motion.span
                                            layoutId="project-filter-pill"
                                            className="absolute inset-0 rounded-full bg-accent"
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 34,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{label}</span>
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </div>

                    <Tabs.Content value={filter} className="outline-none">
                        <div className="relative mt-10 grid w-full min-w-0 max-w-full grid-cols-1 gap-6 md:grid-cols-2">
                            <AnimatePresence mode="popLayout">
                                {visible.map((project, i) => (
                                    <motion.div
                                        key={project.name}
                                        layout="position"
                                        className="min-w-0"
                                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{
                                            duration: 0.45,
                                            ease: "easeOut",
                                            delay: i * 0.05,
                                        }}
                                    >
                                        <ProjectCard project={project} onOpen={setSelected} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>

                <a
                    href={links.githubRepos}
                    target="_blank"
                    rel="noopener"
                    className="mt-10 inline-block font-semibold text-accent underline-offset-4 hover:underline"
                >
                    All repositories on GitHub
                </a>
            </div>

            <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
