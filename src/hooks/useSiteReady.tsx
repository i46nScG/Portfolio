import { createContext, useContext, useEffect, useState } from "react";

export function useSiteReadyState() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const reveal = () => {
            document.fonts.ready.then(() => {
                requestAnimationFrame(() => {
                    if (!cancelled) setReady(true);
                });
            });
        };
        if (document.readyState === "complete") reveal();
        else addEventListener("load", reveal, { once: true });

        return () => {
            cancelled = true;
            removeEventListener("load", reveal);
        };
    }, []);

    useEffect(() => {
        if (ready) document.documentElement.classList.remove("is-loading");
    }, [ready]);

    return ready;
}

export const ReadyContext = createContext(true);
export const useSiteReady = () => useContext(ReadyContext);
