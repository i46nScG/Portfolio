import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { email, links } from "../../data/site";
import { Reveal } from "../ui/Motion";
import { Tip } from "../ui/Tip";

type CopyStatus = "idle" | "copied" | "failed";
const copyLabel: Record<CopyStatus, string> = {
    idle: "Copy email",
    copied: "Copied",
    failed: "Copy failed",
};
const tipText: Record<CopyStatus, string> = {
    idle: email,
    copied: "Copied to clipboard",
    failed: "Could not access the clipboard",
};

function CopyEmailButton() {
    const [status, setStatus] = useState<CopyStatus>("idle");
    const [tipOpen, setTipOpen] = useState(false);
    const timer = useRef<number>();

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
        setTipOpen(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setStatus("idle"), 1800);
    };

    return (
        <Tip content={tipText[status]} open={tipOpen} onOpenChange={setTipOpen}>
            <motion.button
                type="button"
                onClick={copy}
                className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-accent"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
                {copyLabel[status]}
            </motion.button>
        </Tip>
    );
}

const socials = [
    { label: "GitHub", href: links.github, tip: "github.com/i46nScG" },
    { label: "Instagram", href: links.instagram, tip: "@Tokioshy" },
    { label: "Discord", href: links.discord, tip: "discord.gg/ZUahYpXXBD" },
];

export function Contact() {
    return (
        <section id="contact" className="page-section contact-section px-5 py-24">
            <Reveal className="contact-card mx-auto w-full max-w-3xl rounded-3xl border border-line bg-surface p-6 text-center sm:p-14">
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    Let's work together
                </h2>
                <p className="mx-auto mt-4 max-w-md text-lg text-muted">
                    Looking for a developer, or a custom bot for your server? Send an email, or just
                    join my Discord server.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href={`mailto:${email}`}
                        className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/40"
                    >
                        {email}
                    </a>
                    <CopyEmailButton />
                </div>
                <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-muted">
                    {socials.map((s) => (
                        <Tip key={s.label} content={s.tip}>
                            <a
                                className="hover:text-ink"
                                href={s.href}
                                target="_blank"
                                rel="noopener"
                            >
                                {s.label}
                            </a>
                        </Tip>
                    ))}
                </div>
            </Reveal>
            <footer className="site-footer z-10 border-t border-line px-5 py-6 text-center text-sm text-muted">
                © {new Date().getFullYear()} Tokioshy.
            </footer>
        </section>
    );
}
