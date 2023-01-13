import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";

type Props = {};

const Users = async (props: Props) => {
    const session = await unstable_getServerSession(authOptions);

    if (session?.user.role != "ADMIN") redirect("/dashboard");

    return <div>Users</div>;
};

export default Users;
