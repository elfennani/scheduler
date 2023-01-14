import UsersTable from "@/users/components/UsersTable";
import client from "lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { ReactElement } from "react";
import { serialize } from "superjson";

type Props = {};

const Users = async (props: Props) => {
    const users = await client.user.findMany();

    return <UsersTable users={serialize(users)} />;
};

export default Users;
