import { AddUserFormData } from "@/users/components/AddUserModal";
import { Role, User } from "@prisma/client";
import { getRoles } from "@testing-library/react";
import client from "lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import sha256 from "sha256";
import SuperJSON, { deserialize, serialize } from "superjson";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        const body = deserialize<AddUserFormData>(req.body);
        if (!Role[body.role]) {
            res.status(400).send({
                error: { error: `Role \`${body.role}\` is not defined` },
            });
            return;
        }

        const user = await client.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            res.status(409).send({
                error: `Email ${body.email} already exists`,
            });
            return;
        }

        let userAdded: User;

        try {
            userAdded = await client.user.create({
                data: {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    natID: body.natId,
                    password: sha256(body.password),
                    registrationYear: new Date(body.registrationDate),
                    role: body.role,
                },
            });
        } catch (error) {
            res.status(500).send({ error: "Failed to add user" });
            return;
        }
        res.status(200).send(serialize(userAdded));
        return;
    }
    if (req.method == "DELETE") {
        const { userId } = req.body;

        console.log(userId);

        const user = await client.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) {
            res.status(404).send({
                error: `User not found`,
            });
            return;
        }

        try {
            const deletedUser = await client.user.delete({
                where: { id: userId },
            });
        } catch (error) {
            res.status(500).send({
                error: "Failed to delete user",
                detailedError: error,
            });
            console.error(
                "Failed to delete user: ",
                SuperJSON.stringify(error)
            );
            return;
        }

        res.status(204).send(null);
        return;
    }
    if (req.method == "GET") {
        const users = await client.user.findMany();

        res.status(200).json(serialize(users));
    }
}
