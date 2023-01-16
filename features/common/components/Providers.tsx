"use client";
import "../../../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
    children: any;
};

const queryClient = new QueryClient();

const Providers = (props: Props) => {
    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <QueryClientProvider client={queryClient}>
                {props.children}
                <div id="modals"></div>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;
