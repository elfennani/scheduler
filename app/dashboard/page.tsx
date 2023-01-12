"use client";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
    return (
        <div>
            DashboardPage
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default DashboardPage;
