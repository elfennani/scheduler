import { AddUserFormData } from "@/users/components/AddUserModal";
import { Role, User } from "@prisma/client";
import { getRoles } from "@testing-library/react";
import { getReasonPhrase, StatusCodes as HttpCodes } from "http-status-codes";
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
        if (body.role !== Role.ADMIN) {
            res.status(HttpCodes.FORBIDDEN).json({
                error: getReasonPhrase(HttpCodes.FORBIDDEN),
            });
            return;
        }

        const user = await client.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            res.status(HttpCodes.CONFLICT).json({
                error: getReasonPhrase(HttpCodes.CONFLICT),
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
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
                error: getReasonPhrase(HttpCodes.INTERNAL_SERVER_ERROR),
            });
            return;
        }
        res.status(HttpCodes.OK).json(serialize(userAdded));
        return;
    }
    if (req.method == "DELETE") {
        const { userId } = req.body;

        const user = await client.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) {
            res.status(HttpCodes.BAD_REQUEST).send({
                error: getReasonPhrase(HttpCodes.BAD_REQUEST),
            });
            return;
        }

        try {
            const deletedUser = await client.user.delete({
                where: { id: userId },
            });
        } catch (error) {
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
                error: getReasonPhrase(HttpCodes.INTERNAL_SERVER_ERROR),
                detailedError: error,
            });
            return;
        }

        res.status(HttpCodes.NO_CONTENT).send(null);
        return;
    }
    if (req.method == "GET") {
        const users = await client.user.findMany();

        res.status(HttpCodes.OK).json(serialize(users));
    }
}
