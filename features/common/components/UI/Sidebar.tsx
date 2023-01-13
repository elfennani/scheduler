"use client";
import { Role, User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import {
    AiFillHome,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineUser,
} from "react-icons/ai";
import Logo from "./Logo";

type Props = {
    userRole: Role;
};

interface SidebarOption {
    label: string;
    route: string;
    icon: IconType;
    roles?: Role[];
}

const Sidebar = (props: Props) => {
    const pathname = usePathname();

    const sidebarOption: SidebarOption[] = [
        {
            label: "home",
            route: "/dashboard",
            icon: AiOutlineHome,
        },
        {
            label: "users",
            route: "/dashboard/users",
            icon: AiOutlineUser,
            roles: ["ADMIN"],
        },
    ];

    return (
        <div
            className={`bg-white border-r-2  fixed top-0 left-0 bottom-0 flex flex-col justify-between items-stretch p-1 py-4 transition-all w-16 overflow-x-hidden `}
        >
            <div>
                <Logo compact className="mb-4" />
                <hr />
                <nav className="mt-4">
                    <ul className="flex gap-2 flex-col">
                        {sidebarOption
                            .filter((option) =>
                                option.roles
                                    ? option.roles.includes(props.userRole)
                                    : true
                            )
                            .map((option) => (
                                <li key={option.label}>
                                    <Link
                                        href={option.route}
                                        type="button"
                                        className={`text-sm w-full hover:bg-slate-100 py-2 text-slate-400 rounded-sm capitalize gap-1 flex  items-center flex-col justify-center ${
                                            pathname == option.route &&
                                            "!text-emerald-500 !bg-emerald-50"
                                        }`}
                                    >
                                        <option.icon size={16} />
                                        {option.label}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
            <div>
                <button
                    onClick={() => signOut()}
                    title="log out"
                    type="button"
                    className="w-full hover:bg-slate-100 h-14 text-emerald-800 rounded-sm text-sm flex  items-center flex-col justify-center"
                >
                    <AiOutlineLogout size={24} />
                    signout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
