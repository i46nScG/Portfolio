import { useState, type ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";

interface MotionMenuProps {
    trigger: (open: boolean) => ReactNode;
    children: ReactNode;
    align?: "start" | "center" | "end";
    className?: string;
}

export function MotionMenu({ trigger, children, align = "end", className = "" }: MotionMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenu.Trigger asChild>{trigger(open)}</DropdownMenu.Trigger>
            <AnimatePresence>
                {open && (
                    <DropdownMenu.Portal forceMount>
                        <DropdownMenu.Content
                            asChild
                            forceMount
                            align={align}
                            sideOffset={10}
                            collisionPadding={12}
                        >
                            <motion.div
                                className={`z-[70] rounded-2xl border border-line bg-bg/95 p-1.5 shadow-xl shadow-accent/10 backdrop-blur-md ${className}`}
                                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                            >
                                {children}
                            </motion.div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                )}
            </AnimatePresence>
        </DropdownMenu.Root>
    );
}

export const MenuItem = DropdownMenu.Item;
