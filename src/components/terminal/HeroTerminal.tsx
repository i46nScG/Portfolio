import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { Rise } from "../ui/Motion";
import { clearingCommands, commands } from "./commands";
import { TerminalContext } from "./context";
import { Cleared, Intro, UnknownCommand } from "./parts";

interface TerminalLine {
    id: number;
    kind: "echo" | "output";
    content: ReactNode;
}

const chips = ["help", "about", "clear", "stack", "contact", "theme"];

export function HeroTerminal() {
    const { toggle: toggleTheme } = useTheme();
    const reduced = useReducedMotion();

    const nextId = useRef(1);
    const [lines, setLines] = useState<TerminalLine[]>(() => [
        { id: 0, kind: "output", content: <Intro /> },
    ]);
    const [value, setValue] = useState("");
    const [hovered, setHovered] = useState(false);

    const history = useRef<string[]>([]);
    const historyIndex = useRef(-1);
    const wrapRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const outRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const run = useCallback(
        (raw: string) => {
            const name = raw.trim().replace(/^\//, "").toLowerCase();
            if (!name) return;

            if (history.current[history.current.length - 1] !== name) history.current.push(name);
            historyIndex.current = history.current.length;

            const id = () => nextId.current++;

            if (clearingCommands.has(name)) {
                setLines([{ id: id(), kind: "output", content: <Cleared /> }]);
                return;
            }

            const build = commands[name];
            const output = build ? build({ toggleTheme }) : <UnknownCommand name={name} />;
            setLines((prev) => [
                ...prev,
                { id: id(), kind: "echo", content: name },
                { id: id(), kind: "output", content: output },
            ]);
        },
        [toggleTheme],
    );

    const terminal = useMemo(() => ({ run }), [run]);

    useEffect(() => {
        const out = outRef.current;
        if (out) out.scrollTop = out.scrollHeight;
    }, [lines]);

    useEffect(() => {
        const onKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
            const active = document.activeElement as HTMLElement | null;
            if (
                active &&
                (active.isContentEditable || /^(input|textarea|select)$/i.test(active.tagName))
            ) {
                return;
            }
            e.preventDefault();

            wrapRef.current?.scrollIntoView({
                behavior: reduced ? "auto" : "smooth",
                block: "center",
            });
            inputRef.current?.focus({ preventScroll: true });

            const win = windowRef.current;
            if (win) {
                win.classList.remove("terminal-focus-flash");
                void win.offsetWidth;
                win.classList.add("terminal-focus-flash");
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [reduced]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        run(value);
        setValue("");
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const h = history.current;
        if (e.key === "Escape") {
            e.currentTarget.blur();
        } else if (e.key === "ArrowUp" && h.length > 0) {
            e.preventDefault();
            if (historyIndex.current > 0) historyIndex.current--;
            setValue(h[historyIndex.current] || "");
        } else if (e.key === "ArrowDown" && h.length > 0) {
            e.preventDefault();
            if (historyIndex.current < h.length - 1) {
                historyIndex.current++;
                setValue(h[historyIndex.current] || "");
            } else {
                historyIndex.current = h.length;
                setValue("");
            }
        }
    };

    const commandActive = hovered || value.length > 0;

    return (
        <TerminalContext.Provider value={terminal}>
            <Rise
                delay={0.45}
                className={`hero-terminal-wrap ${commandActive ? "is-command-active" : ""}`}
            >
                <div ref={wrapRef}>
                    <div className="floating-note note-top" aria-hidden="true">
                        <span className="note-icon">JS</span>
                        <span>
                            <strong>Discord.js &amp; Edge</strong>
                            <small>v14 · Cloudflare Workers</small>
                        </span>
                    </div>
                    <div className="floating-note note-bottom" aria-hidden="true">
                        <span className="status-dot" />
                        <span>
                            <strong>Harmony Hub</strong>
                            <small>Active bot infrastructure</small>
                        </span>
                    </div>
                    <div
                        ref={windowRef}
                        className="terminal-window rounded-2xl border border-line bg-surface shadow-xl shadow-accent/10"
                    >
                        <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full border border-line bg-soft/80" />
                                <span className="h-2.5 w-2.5 rounded-full border border-line bg-muted/40" />
                                <span className="h-2.5 w-2.5 rounded-full border border-line bg-accent/70" />
                                <span className="ml-2 text-sm text-muted">Try a command</span>
                            </div>
                        </div>
                        <div
                            ref={outRef}
                            aria-live="polite"
                            className="h-64 space-y-2 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
                        >
                            <AnimatePresence initial={false}>
                                {lines.map((line) => (
                                    <motion.div
                                        key={line.id}
                                        layout="position"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                        transition={{ duration: 0.28, ease: "easeOut" }}
                                        className={
                                            line.kind === "echo"
                                                ? "flex items-center gap-1.5 pt-1 font-mono text-xs font-semibold text-ink"
                                                : "text-muted"
                                        }
                                    >
                                        {line.kind === "echo" ? (
                                            <>
                                                <span className="font-semibold text-accent">❯</span>
                                                <span>/{line.content}</span>
                                            </>
                                        ) : (
                                            line.content
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-wrap gap-2 border-t border-line px-4 pt-3">
                            {chips.map((name) => (
                                <button
                                    key={name}
                                    type="button"
                                    className="chip"
                                    onClick={() => run(name)}
                                >
                                    /{name}
                                </button>
                            ))}
                        </div>
                        <form
                            className="flex items-center gap-2 px-4 pb-4 pt-3 font-mono text-sm"
                            autoComplete="off"
                            onSubmit={onSubmit}
                            onPointerEnter={() => setHovered(true)}
                            onPointerLeave={() => setHovered(false)}
                        >
                            <span className="font-semibold text-accent">/</span>
                            <input
                                ref={inputRef}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={onKeyDown}
                                aria-label="Type a command, for example help"
                                placeholder="help (press Enter or tap a chip)"
                                className="w-full bg-transparent outline-none placeholder:text-muted/60"
                            />
                        </form>
                    </div>
                </div>
            </Rise>
        </TerminalContext.Provider>
    );
}
