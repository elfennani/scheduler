"use client";
import "../../../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "@next/font/google";

type Props = {
    children: any;
};

export const queryClient = new QueryClient();

const Providers = (props: Props) => {
    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;
