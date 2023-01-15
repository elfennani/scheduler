"use client";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { Portal } from "react-portal";

type Props = {
    title?: string;
    children: ReactNode | ReactNode[];
    onClose?(): void;
};

const PortalClientSide = dynamic(
    async () => (await import("react-portal")).Portal,
    { ssr: false }
);

const Modal = ({ title, children, onClose }: Props) => {
    useEffect(() => {
        const onKeyPress = (ev: KeyboardEvent) => {
            if (ev.key == "Escape" && onClose) onClose();
        };

        window.addEventListener("keyup", onKeyPress);

        return () => window.removeEventListener("keypress", onKeyPress);
    }, [onClose]);
    return (
        <PortalClientSide node={document && document.getElementById("modals")}>
            <div
                className="fixed top-0 p-4 bottom-0 left-0 right-0 bg-black bg-opacity-30"
                onClick={() => onClose && onClose()}
                data-testid="backdrop"
            >
                <main
                    data-testid="main-modal"
                    onClick={(e) => e.stopPropagation()}
                    className="fixed max-h-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 overflow-auto top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black bg-white p-6 border-2 w-128"
                >
                    {title && (
                        <h1 className="text-2xl text-slate-900 dark:text-slate-100 mb-4 mt-0">
                            {title}
                        </h1>
                    )}
                    {children}
                </main>
            </div>
        </PortalClientSide>
    );
};

export default Modal;
