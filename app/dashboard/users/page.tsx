import UsersTable from "@/users/components/UsersTable";
import client from "lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { ReactElement } from "react";

type Props = {};

const Users = async (props: Props) => {
    const users = (await client.user.findMany()).map((user) => ({
        ...user,
        registrationYear: user.registrationYear.toString(),
    }));

    return <UsersTable users={users} />;
};

export default Users;
