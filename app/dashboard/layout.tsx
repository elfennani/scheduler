import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const DashboardLayout = async (props: Props) => {
    const session = await unstable_getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    return <>{props.children}</>;
};

export default DashboardLayout;
