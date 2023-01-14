"use client";
import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
// import Modal from "@/common/components/UI/Modal";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const Modal = dynamic(() => import("@/common/components/UI/Modal"), {
    ssr: false,
});

type Props = {
    users: Modify<User, { registrationYear: string }>[];
};

const UsersTable = ({ users: usersSerialized }: Props) => {
    const [addUser, setAddUser] = useState(false);

    const users: User[] = usersSerialized.map((user) => ({
        ...user,
        registrationYear: new Date(user.registrationYear),
    }));

    const parseDate = (date: Date): string => {
        return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
            date.getMonth() < 10 ? "0" : ""
        }${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="mt-4">
            {addUser && (
                <Modal title="Add User" onClose={() => setAddUser(false)}>
                    <Input>username</Input>
                </Modal>
            )}
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
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
