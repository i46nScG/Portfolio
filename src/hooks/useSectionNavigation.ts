import { useEffect, useState } from "react";
import { sectionAliases, sectionIds } from "../data/site";

export const sectionIndexForHash = (hash: string) => {
    const raw = hash.replace(/^#/, "");
    const id = sectionAliases[raw] || raw;
    return (sectionIds as readonly string[]).indexOf(id);
};

const getCleanUrl = () => location.pathname + location.search;
const behavior = (reduced: boolean) => (reduced ? "auto" : "smooth") as ScrollBehavior;

export function useSectionNavigation(reduced: boolean) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const sections = sectionIds.map((id) => document.getElementById(id));
        let current = Math.max(
            sectionIndexForHash(location.hash),
            typeof history.state?.sectionIndex === "number" ? history.state.sectionIndex : 0,
            0,
        );

        if (location.hash || !history.state) {
            history.replaceState({ sectionIndex: current }, "", getCleanUrl());
        }

        const update = () => {
            const center = innerHeight / 2;
            const idx = sections.findIndex((s) => {
                if (!s) return false;
                const b = s.getBoundingClientRect();
                return b.top <= center && b.bottom > center;
            });
            if (idx >= 0) current = idx;
            setActiveIndex(current);
        };

        const goTo = (index: number) => {
            current = index;
            update();
            sections[index]?.scrollIntoView({ behavior: behavior(reduced) });
        };

        const onClick = (event: MouseEvent) => {
            const anchor =
                event.target instanceof Element
                    ? event.target.closest<HTMLAnchorElement>("a[href^='#']")
                    : null;
            if (
                !anchor ||
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                anchor.target
            ) {
                return;
            }
            const index = sectionIndexForHash(anchor.hash);
            if (index < 0) return;
            event.preventDefault();
            if (index !== current) history.pushState({ sectionIndex: index }, "", getCleanUrl());
            goTo(index);
        };

        const onPopState = (event: PopStateEvent) => {
            const target =
                typeof event.state?.sectionIndex === "number" ? event.state.sectionIndex : 0;
            if (target === current) return;
            goTo(target);
        };

        const onHashChange = () => {
            const index = sectionIndexForHash(location.hash);
            if (location.hash) {
                history.replaceState({ sectionIndex: Math.max(index, 0) }, "", getCleanUrl());
            }
            if (index < 0) return;
            goTo(index);
        };

        update();
        addEventListener("scroll", update, { passive: true });
        addEventListener("resize", update, { passive: true });
        document.addEventListener("click", onClick);
        addEventListener("popstate", onPopState);
        addEventListener("hashchange", onHashChange);

        let raf = 0;
        if (current > 0) {
            raf = requestAnimationFrame(() =>
                sections[current]?.scrollIntoView({ behavior: "instant" as ScrollBehavior }),
            );
        }

        return () => {
            cancelAnimationFrame(raf);
            removeEventListener("scroll", update);
            removeEventListener("resize", update);
            document.removeEventListener("click", onClick);
            removeEventListener("popstate", onPopState);
            removeEventListener("hashchange", onHashChange);
        };
    }, [reduced]);

    return activeIndex;
}
