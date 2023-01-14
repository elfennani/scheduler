import { User } from "@prisma/client";
import SuperJSON from "superjson";

export const getUsers = async (): Promise<User[]> => {
    let res;
    try {
        res = await fetch("/api/users");
    } catch (error) {
        throw "Failed to get users";
    }

    if (res.status != 200) throw "Failed to get users";
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

    if (res.status != 200) throw (await res.json()).error;

    return SuperJSON.deserialize(await res.json());
};

export const deleteUser = async (id: any): Promise<void> => {
    await fetch("/api/users", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
    });
};
