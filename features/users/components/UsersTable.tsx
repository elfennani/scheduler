"use client";
import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, getUsers } from "repositories/users";
import { deserialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

type Props = {
    users: SuperJSONResult;
};
const AddUserModal = dynamic(() => import("../components/AddUserModal"), {
    ssr: false,
});
const UsersTable = ({ users }: Props) => {
    const [addUser, setAddUser] = useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, error, isError, isSuccess } = useQuery(
        ["users"],
        () => getUsers(),
        {
            initialData: deserialize(users),
        }
    );

    const { mutate: deleteUserMutation, isLoading: isDeletingUser } =
        useMutation({
            mutationFn: (id: string) => {
                return deleteUser(id);
            },
            onSuccess() {
                queryClient.invalidateQueries(["users"]);
            },
        });

    const parseDate = (date: Date): string => {
        return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
            date.getMonth() < 10 ? "0" : ""
        }${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    if (error || isError || !isSuccess) return <>An Error Occured</>;
    if (isLoading) return <>Loading...</>;

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
            <table className="w-full mt-4 text-sm text-left text-gray-500 bg-white border-2 border-slate-200">
                <thead>
                    <tr className="text-xs text-gray-700 uppercase bg-slate-200 sticky top-0">
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
                    {data.map((user) => (
                        <tr
                            key={user.id}
                            className="text-base border border-slate-200"
                        >
                            <td className="px-4 py-3 text-slate-800 font-medium">
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
