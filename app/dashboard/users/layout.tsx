import UsersTable from "@/users/components/UsersTable";
import client from "lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Users = async (props: Props) => {
    const session = await unstable_getServerSession(authOptions);

    if (session?.user.role != "ADMIN") redirect("/dashboard");

    return (
        <div>
            <h1 className="text-3xl font-medium text-slate-500">Users</h1>
            {props.children}
        </div>
    );
};

export default Users;
