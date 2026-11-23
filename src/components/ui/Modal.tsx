import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    children: ReactNode;
    size?: string;
}

export function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    size = "max-w-2xl",
}: ModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild forceMount>
                            <motion.div
                                className="fixed inset-0 z-[80] bg-bg/70 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </Dialog.Overlay>
                        <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center p-4">
                            <Dialog.Content asChild forceMount>
                                <motion.div
                                    className={`pointer-events-auto relative max-h-[88svh] w-full ${size} overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-2xl shadow-accent/10 sm:p-7`}
                                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                >
                                    <Dialog.Close
                                        aria-label="Close"
                                        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg/60 text-muted transition hover:border-accent hover:text-ink"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                        </svg>
                                    </Dialog.Close>
                                    <Dialog.Title className="pr-10 font-display text-2xl font-bold tracking-tight text-ink">
                                        {title}
                                    </Dialog.Title>
                                    <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                                        {description}
                                    </Dialog.Description>
                                    {children}
                                </motion.div>
                            </Dialog.Content>
                        </div>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
