import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
import Select from "@/common/components/UI/Select";
import { Role, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    AiFillDelete,
    AiFillEdit,
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineLoading,
} from "react-icons/ai";
import { deleteUser } from "repositories/users";
import { caps, parseDate } from "utils/functions";

type Props = {
    user: User;
};

type ModifyFormData = {};

/*
<>
    <td
        className={`${tdClassName} text-slate-800 dark:text-slate-200 font-medium flex gap-2`}
    >
        <Input
            defaultValue={`${user.firstName}`}
            className="flex-1"
        />
        <Input
            defaultValue={`${user.lastName}`}
            className="flex-1"
        />
    </td>
    <td className={tdClassName}>
        <Input defaultValue={user.email} />
    </td>
    <td className={tdClassName}>
        <Select defaultValue={user.role}>
            {Object.keys(Role).map((role) => (
                <option key={role} value={role}>
                    {caps(role)}
                </option>
            ))}
        </Select>
    </td>
    <td className={tdClassName}>
        <Input defaultValue={user.natID} />
    </td>
    <td className={tdClassName}>
        <Input
            defaultValue={parseDate(user.registrationYear)}
        />
    </td>
</>
*/

const UserRow = ({ user }: Props) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const tdClassName = "px-4 py-3";

    const { mutate: deleteUserMutation, isLoading: isDeletingUser } =
        useMutation<void, Error, string>({
            mutationFn: (id: string) => {
                return deleteUser(id);
            },
            onSuccess() {
                return queryClient.invalidateQueries(["users"]);
            },
        });

    return (
        <>
            <tr
                className={`text-base border border-slate-200 dark:border-slate-700 ${
                    isEditing ? "bg-emerald-50" : ""
                }`}
            >
                <td
                    className={`${tdClassName} text-slate-800 dark:text-slate-200 font-medium`}
                >
                    {user.firstName} {user.lastName}
                </td>
                <td className={tdClassName}>{user.email}</td>
                <td className={tdClassName}>{user.role}</td>
                <td className={tdClassName}>{user.natID}</td>
                <td className={tdClassName}>
                    {parseDate(user.registrationYear)}
                </td>
                <td className={`${tdClassName} flex gap-2`}>
                    <Button
                        onClick={() => setIsEditing((e) => !e)}
                        className="rounded-sm"
                        title="Edit info"
                    >
                        <AiFillEdit />
                    </Button>
                    <Button
                        onClick={() => deleteUserMutation(user.id)}
                        disabled={isDeletingUser}
                        className="rounded-sm"
                        title="Delete user"
                    >
                        {isDeletingUser ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            <AiFillDelete />
                        )}
                    </Button>
                </td>
            </tr>
            {isEditing && (
                <tr className="text-base text-black border border-slate-200 dark:border-slate-700">
                    <td className={`${tdClassName} `} colSpan={6}>
                        <div className="flex">
                            <div className="flex-1">
                                <h1 className="text-3xl font-medium">Edit</h1>
                            </div>
                            <div className="items-stretch flex flex-col gap-2">
                                <Button>
                                    <AiOutlineCheck /> Apply
                                </Button>
                                <Button
                                    secondary
                                    onClick={() => setIsEditing(false)}
                                >
                                    <AiOutlineClose /> Close
                                </Button>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default UserRow;
