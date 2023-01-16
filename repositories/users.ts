import { User } from "@prisma/client";
import Users from "app/dashboard/users/page";
import { StatusCodes } from "http-status-codes";
import SuperJSON from "superjson";
import { TypeOf } from "zod";

export const getUsers = async (): Promise<User[]> => {
    const res = await fetch("/api/users");

    if (res.status === StatusCodes.FORBIDDEN)
        throw new Error("Unauthorized action");
    if (res.status != 200) throw new Error("Failed to get users");

    const json = await res.json();

    return SuperJSON.deserialize(json);
};

export const addUser = async (body: any): Promise<User> => {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(SuperJSON.serialize(body)),
    });

    if (res.status === StatusCodes.FORBIDDEN)
        throw new Error("Unauthorized action");
    if (res.status === StatusCodes.CONFLICT)
        throw new Error("User email already exists");
    if (res.status !== StatusCodes.OK)
        throw new Error("Server error", { cause: (await res.json()).message });

    return SuperJSON.deserialize(await res.json());
};

export const deleteUser = async (id: string): Promise<void> => {
    // TODO: REMOVE THIS LINE LATER
    await new Promise((res) => setTimeout(res, 5000));
    return;
    const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
    });

    if (res.status === StatusCodes.FORBIDDEN)
        throw new Error("Unauthorized action");

    if (res.status == StatusCodes.INTERNAL_SERVER_ERROR)
        throw new Error("Server error", { cause: (await res.json()).message });
};
