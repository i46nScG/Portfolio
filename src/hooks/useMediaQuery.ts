import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => matchMedia(query).matches);

    useEffect(() => {
        const mql = matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}

export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
