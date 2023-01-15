"use client";
import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { deleteUser, getUsers } from "repositories/users";
import { deserialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";
import AddUserModal from "../components/AddUserModal";

type Props = {
    users: SuperJSONResult;
};
// const AddUserModal = dynamic(() => import("../components/AddUserModal"), {
//     ssr: false,
// });
const UsersTable = ({ users }: Props) => {
    const [addUser, setAddUser] = useState(false);
    const queryClient = useQueryClient();

    // TODO: Make table row into a seperate component and move the mutate function into it

    const usersQuery = useQuery(["users"], () => getUsers(), {
        placeholderData: deserialize(users),
    });

    const { mutate: deleteUserMutation, isLoading: isDeletingUser } =
        useMutation({
            mutationFn: (id: string) => {
                return deleteUser(id);
            },
            onSuccess() {
                return queryClient.invalidateQueries(["users"]);
            },
        });

    const parseDate = (date: Date) =>
        `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
            date.getMonth() < 10 ? "0" : ""
        }${date.getMonth() + 1}/${date.getFullYear()}`;

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
                        <th scope="col" className="px-4 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersQuery.data.map((user) => (
                        <tr
                            key={user.id}
                            className="text-base border border-slate-200 dark:border-slate-700"
                        >
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-200 font-medium">
                                {user.firstName} {user.lastName}
                            </td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.role}</td>
                            <td className="px-4 py-3">{user.natID}</td>
                            <td className="px-4 py-3">
                                {parseDate(user.registrationYear)}
                            </td>
                            <td className="px-4 py-3">
                                <Button
                                    onClick={() => deleteUserMutation(user.id)}
                                >
                                    {isDeletingUser ? "Deleting" : "Delete"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
