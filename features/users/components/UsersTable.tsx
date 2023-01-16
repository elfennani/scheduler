"use client";
import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { deleteUser, getUsers } from "repositories/users";
import { deserialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";
import AddUserModal from "../components/AddUserModal";
import UserRow from "./UserRow";

type Props = {
    users: SuperJSONResult;
};

const UsersTable = ({ users }: Props) => {
    const [addUser, setAddUser] = useState(false);

    const usersQuery = useQuery(["users"], () => getUsers(), {
        placeholderData: deserialize(users),
        onError: (e) => console.log(e),
    });

    if (usersQuery.error)
        return (
            <p className="p-4 border-red-500 bg-red-50 text-red-900 border-2">
                Failed to load users
            </p>
        );

    if (usersQuery.isLoading || !usersQuery.data) return <>Loading...</>;

    return (
        <div className="mt-4">
            {addUser && <AddUserModal onClose={() => setAddUser(false)} />}
            <div className="flex justify-between items-end">
                <Input className="w-96">Search</Input>
                <Button
                    className="flex gap-1 items-center"
                    onClick={() => setAddUser(true)}
                >
                    <AiOutlineUserAdd /> Add User
                </Button>
            </div>
            <table className="w-full mt-4 text-sm text-left text-gray-500 bg-white dark:bg-slate-800 dark:text-gray-400 border-2 dark:border-slate-700 border-slate-200">
                <thead>
                    <tr className="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-slate-700 dark:text-gray-400 sticky top-0">
                        <th scope="col" className="px-4 py-3">
                            Fullname
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Nat. ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Register.
                        </th>
                        <th scope="col" className="px-4 py-3 w-16">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersQuery.data.map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
