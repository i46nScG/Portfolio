import type { Project } from "../../data/projects";
import { TiltCard } from "../ui/TiltCard";

export const repoSlug = (url: string) => url.replace(/^https?:\/\/github\.com\//i, "");

export const previewUrlOf = (p: Project) =>
    p.previewUrl || "https://" + p.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".local";

export function ProjectMetaGrid({ project }: { project: Project }) {
    return (
        <div className="grid min-w-0 grid-cols-2 gap-2.5 pt-1 sm:grid-cols-3">
            {project.meta.map((m) => (
                <div key={m.label} className="min-w-0 space-y-0.5">
                    <span className="block truncate font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {m.label}
                    </span>
                    <span className="block truncate font-mono text-xs font-medium text-ink">
                        {m.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export function ProofBlock({ project }: { project: Project }) {
    const isBot = project.type === "bots";
    return (
        <div className="min-w-0 rounded-lg border border-line/60 bg-surface/90 p-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                <svg
                    className="h-3 w-3 shrink-0 text-ink"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    {isBot ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    )}
                </svg>
                <span className="truncate">
                    {isBot ? "Proof of Work & Architecture" : "Privacy & Offline Architecture"}
                </span>
            </div>
            <p className="mt-1 break-words font-sans text-xs leading-relaxed text-muted">
                {project.proof}
            </p>
        </div>
    );
}

export function ProjectHeader({ project }: { project: Project }) {
    const isBot = project.type === "bots";
    return (
        <div className="flex min-w-0 items-center justify-between gap-2 border-b border-line/60 pb-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg font-mono text-xs font-bold text-ink">
                    {project.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex min-w-0 items-center gap-1.5">
                    <h3 className="truncate font-display text-base font-bold text-ink">
                        {project.name}
                    </h3>
                    {isBot ? (
                        <span className="shrink-0 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-bg">
                            APP
                        </span>
                    ) : (
                        <span className="shrink-0 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-muted">
                            WEB
                        </span>
                    )}
                </div>
                <span className="hidden truncate font-mono text-[11px] text-muted/70 sm:inline">
                    {project.status}
                </span>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line/80 bg-bg/50 px-2.5 py-0.5 font-mono text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-soft" />
                {project.lang}
            </span>
        </div>
    );
}

interface ProjectCardProps {
    project: Project;
    onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
    const isBot = project.type === "bots";
    const previewUrl = previewUrlOf(project);

    return (
        <TiltCard
            className="card relative flex h-full w-full min-w-0 max-w-full cursor-pointer flex-col justify-between rounded-2xl border border-line bg-surface p-4 sm:p-6"
            onClick={(e) => {
                // Links and buttons inside the card keep their own behavior.
                if ((e.target as HTMLElement).closest("a, button")) return;
                onOpen(project);
            }}
        >
            <div className="min-w-0">
                <ProjectHeader project={project} />

                {isBot ? (
                    <div className="mt-4 min-w-0 max-w-full space-y-3 rounded-l-sm rounded-r-xl border border-l-[3.5px] border-line/70 border-l-ink bg-bg/40 p-3.5 sm:p-4">
                        <div className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-muted">
                            <span className="font-semibold text-accent">/</span>
                            <span className="truncate font-semibold text-ink">
                                {project.name.toLowerCase()}
                            </span>
                            <span className="shrink-0 text-muted/60">— overview</span>
                        </div>
                        <p className="break-words text-sm font-medium leading-relaxed text-ink">
                            {project.desc}
                        </p>
                        <ProofBlock project={project} />
                        <ProjectMetaGrid project={project} />
                        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-line/50 pt-2 font-mono text-[11px] text-muted">
                            <span className="min-w-0 truncate" title={project.footer}>
                                {project.footer}
                            </span>
                            <span className="shrink-0 text-[10px]">Verified</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 min-w-0 max-w-full space-y-3 rounded-xl border border-line/70 bg-bg/40 p-3.5 sm:p-4">
                        <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-line/60 bg-surface/90 px-3 py-1.5 font-mono text-xs text-muted">
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                                <span className="h-2 w-2 shrink-0 rounded-full bg-soft" />
                                <span className="min-w-0 truncate text-ink">{previewUrl}</span>
                            </div>
                            <a
                                href={previewUrl}
                                target="_blank"
                                rel="noopener"
                                className="ml-2 shrink-0 text-[10px] text-muted hover:text-accent hover:underline"
                            >
                                {project.previewBadge || "client-only"}
                            </a>
                        </div>
                        <p className="break-words text-sm font-medium leading-relaxed text-ink">
                            {project.desc}
                        </p>
                        <ProofBlock project={project} />
                        <ProjectMetaGrid project={project} />
                        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-line/50 pt-2 font-mono text-[11px] text-muted">
                            <span className="min-w-0 truncate" title={project.footer}>
                                {project.footer}
                            </span>
                            <span className="shrink-0 text-[10px]">Zero Telemetry</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-5 flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-3">
                <div className="flex items-center gap-4">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener"
                        className="card-link inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold text-accent underline-offset-4 hover:underline"
                    >
                        <span>Inspect Source</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                    <button
                        type="button"
                        onClick={() => onOpen(project)}
                        aria-label={`Open details for ${project.name}`}
                        className="shrink-0 font-mono text-xs font-semibold text-muted underline-offset-4 transition hover:text-ink hover:underline"
                    >
                        Details
                    </button>
                </div>
                <span className="min-w-0 truncate font-mono text-[11px] text-muted/70">
                    github.com/{repoSlug(project.url)}
                </span>
            </div>
        </TiltCard>
    );
}
