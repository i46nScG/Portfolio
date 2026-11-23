import { createContext, useContext } from "react";

interface TerminalContextValue {
    run: (command: string) => void;
}

export const TerminalContext = createContext<TerminalContextValue>({ run: () => {} });
export const useTerminal = () => useContext(TerminalContext);
