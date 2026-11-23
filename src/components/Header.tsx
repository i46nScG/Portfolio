import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navItems } from "../data/site";
import { sectionIndexForHash } from "../hooks/useSectionNavigation";
import { MenuItem, MotionMenu } from "./ui/MotionMenu";
import { ThemeToggle } from "./ThemeToggle";

const linkProps = (activeIndex: number, href: string) => ({
    href,
    "aria-current": sectionIndexForHash(href) === activeIndex ? ("location" as const) : undefined,
});

export function Header({ activeIndex }: { activeIndex: number }) {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(() => scrollY.get() > 10);
    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors ${
                scrolled ? "border-line bg-bg/70" : "border-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-5">
                <a href="#top" className="font-display text-xl font-bold tracking-tight">
                    Tokioshy
                </a>
                <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            className="section-nav-link transition hover:text-ink"
                            {...linkProps(activeIndex, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="md:hidden">
                        <MotionMenu
                            className="min-w-[13rem]"
                            trigger={(open) => (
                                <motion.button
                                    type="button"
                                    aria-label={open ? "Close menu" : "Open menu"}
                                    className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-surface transition-colors hover:border-accent"
                                    whileTap={{ scale: 0.92 }}
                                >
                                    <span className="relative h-5 w-5" aria-hidden="true">
                                        <span className="absolute left-0 top-[3px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out group-data-[state=open]:translate-y-2 group-data-[state=open]:rotate-45 motion-reduce:transition-none" />
                                        <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out group-data-[state=open]:scale-x-0 group-data-[state=open]:opacity-0 motion-reduce:transition-none" />
                                        <span className="absolute bottom-[3px] left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out group-data-[state=open]:-translate-y-2 group-data-[state=open]:-rotate-45 motion-reduce:transition-none" />
                                    </span>
                                </motion.button>
                            )}
                        >
                            {navItems.map((item) => (
                                <MenuItem key={item.href} asChild>
                                    <a
                                        className="section-nav-link block rounded-xl px-3.5 py-2.5 text-base font-medium outline-none transition-colors data-[highlighted]:bg-surface"
                                        {...linkProps(activeIndex, item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </MenuItem>
                            ))}
                        </MotionMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
