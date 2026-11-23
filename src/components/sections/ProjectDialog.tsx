import type { Project } from "../../data/projects";
import { Modal } from "../ui/Modal";
import { Tip } from "../ui/Tip";
import { ProjectHeader, ProjectMetaGrid, ProofBlock, previewUrlOf, repoSlug } from "./ProjectCard";

interface ProjectDialogProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
    return (
        <Modal
            open={!!project}
            onOpenChange={(open) => !open && onClose()}
            title={project?.name ?? ""}
            description={project?.desc ?? ""}
        >
            {project && (
                <div className="mt-5 space-y-4">
                    <ProjectHeader project={project} />
                    <ProofBlock project={project} />
                    <ProjectMetaGrid project={project} />
                    <div className="border-t border-line/50 pt-3 font-mono text-[11px] text-muted">
                        {project.footer}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Tip content={`github.com/${repoSlug(project.url)}`}>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener"
                                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/40"
                            >
                                Inspect Source ↗
                            </a>
                        </Tip>
                        {project.type === "web" && (
                            <a
                                href={previewUrlOf(project)}
                                target="_blank"
                                rel="noopener"
                                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent"
                            >
                                {previewUrlOf(project)
                                    .replace(/^https?:\/\//, "")
                                    .replace(/\/$/, "")}{" "}
                                ↗
                            </a>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
}
