import Sidebar from "@/common/components/UI/Sidebar";
import { unstable_getServerSession } from "next-auth";
import { Session, SessionData } from "next-session/lib/types";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const DashboardLayout = async (props: Props) => {
    const session = await unstable_getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    return (
        <>
            <Sidebar userRole={session.user?.role} />
            <main className="ml-16 p-8">{props.children}</main>
        </>
    );
};

export default DashboardLayout;
