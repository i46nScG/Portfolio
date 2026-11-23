import { useEffect, useState } from "react";

export function useTyped(words: readonly string[], reduced: boolean) {
    const [text, setText] = useState(reduced ? words[0] : "");

    useEffect(() => {
        if (reduced) {
            setText(words[0]);
            return;
        }

        let r = 0;
        let c = 0;
        let del = false;
        let timer: number;

        const tick = () => {
            const word = words[r];
            setText(word.slice(0, c));
            if (!del && c === word.length) {
                del = true;
                timer = window.setTimeout(tick, 1600);
                return;
            }
            if (del && c === 0) {
                del = false;
                r = (r + 1) % words.length;
                timer = window.setTimeout(tick, 350);
                return;
            }
            c += del ? -1 : 1;
            timer = window.setTimeout(tick, del ? 35 : 80);
        };
        tick();

        return () => window.clearTimeout(timer);
    }, [words, reduced]);

    return text;
}
