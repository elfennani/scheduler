"use client";
import React, { ReactNode } from "react";
import { Portal } from "react-portal";

type Props = {
    title?: string;
    children: ReactNode | ReactNode[];
    onClose?(): void;
};

const Modal = ({ title, children, onClose }: Props) => {
    let doc;
    try {
        doc = document || null;
    } catch (error) {}
    return (
        <Portal node={doc && document.getElementById("san-francisco")}>
            <div
                className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30"
                onClick={() => onClose && onClose()}
            >
                <main
                    onClick={(e) => e.stopPropagation()}
                    className="fixed top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black bg-white p-6 border-2 w-128"
                >
                    {title && (
                        <h1 className="text-2xl text-slate-900 mb-4 mt-0">
                            {title}
                        </h1>
                    )}
                    {children}
                </main>
            </div>
        </Portal>
    );
};

export default Modal;
