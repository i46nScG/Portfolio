import type { ReactNode } from "react";
import { useTerminal } from "./context";

export function Note({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-1.5 py-0.5 font-mono text-xs">
            <p className="font-sans leading-relaxed text-muted">{children}</p>
        </div>
    );
}

export function TermLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            className="text-accent underline underline-offset-2 transition hover:text-ink"
            href={href}
            target="_blank"
            rel="noopener"
        >
            {children}
        </a>
    );
}

export function CmdButton({
    name,
    className = "font-semibold text-accent underline underline-offset-2",
    children,
}: {
    name: string;
    className?: string;
    children?: ReactNode;
}) {
    const { run } = useTerminal();
    return (
        <button type="button" className={className} onClick={() => run(name)}>
            {children ?? `/${name}`}
        </button>
    );
}

export function Cleared() {
    return (
        <div className="font-mono text-xs text-muted">
            Console buffer cleared. Type <CmdButton name="help" /> for commands.
        </div>
    );
}

export function Intro() {
    return (
        <div className="space-y-1 font-mono text-xs">
            <div className="text-muted">
                Type <CmdButton name="help" />, tap chips below, or press{" "}
                <kbd className="rounded border border-line bg-surface px-1 py-0.5 text-[10px] font-semibold text-ink">
                    [/]
                </kbd>{" "}
                anywhere.
            </div>
        </div>
    );
}

export function UnknownCommand({ name }: { name: string }) {
    return (
        <div className="font-mono text-xs text-soft">
            zsh: command not found: <span className="text-ink">/{name}</span>. Type{" "}
            <CmdButton
                name="help"
                className="font-semibold text-accent underline underline-offset-2 transition hover:text-ink"
            />{" "}
            for available commands.
        </div>
    );
}
