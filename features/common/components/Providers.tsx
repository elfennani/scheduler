"use client";
import "../../../styles/globals.css";
import React from "react";
import { QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import queryClient from "lib/queryClient";

type Props = {
    children: any;
};

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
