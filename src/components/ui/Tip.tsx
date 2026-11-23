import type { ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TipProps {
    content: ReactNode;
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function TooltipProvider({ children }: { children: ReactNode }) {
    return (
        <Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
            {children}
        </Tooltip.Provider>
    );
}

export function Tip({ content, children, side = "top", open, onOpenChange }: TipProps) {
    return (
        <Tooltip.Root open={open} onOpenChange={onOpenChange}>
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    side={side}
                    sideOffset={8}
                    collisionPadding={12}
                    className="tip-content z-[100] max-w-[16rem] rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] font-medium text-ink shadow-lg shadow-accent/10"
                >
                    {content}
                    <Tooltip.Arrow className="fill-line" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
}
