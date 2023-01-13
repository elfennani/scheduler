import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {};

const UsersLoading = (props: Props) => {
    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center text-xl text-emerald-500">
            <AiOutlineLoading size={64} className="animate-spin" />
            Loading...
        </div>
    );
};

export default UsersLoading;
