import { AddUserFormData } from "@/users/components/AddUserModal";
import { Role, User } from "@prisma/client";
import { getReasonPhrase, StatusCodes as HttpCodes } from "http-status-codes";
import client from "lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { AiTwotoneLayout } from "react-icons/ai";
import sha256 from "sha256";
import { deserialize, parse, serialize, stringify } from "superjson";
import { authOptions } from "../auth/[...nextauth]";

const sendError = (res: NextApiResponse, code: HttpCodes, message?: any) =>
    res
        .status(code)
        .json({ error: getReasonPhrase(code), message: stringify(message) });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session || session.user.role != "ADMIN") {
        sendError(res, HttpCodes.FORBIDDEN);
        return;
    }

    if (req.method == "POST") {
        const body = deserialize<AddUserFormData>(req.body);

        const user = await client.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            sendError(res, HttpCodes.CONFLICT);

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
            sendError(res, HttpCodes.INTERNAL_SERVER_ERROR, error);

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
            sendError(res, HttpCodes.BAD_REQUEST);
            return;
        }

        try {
            const deletedUser = await client.user.delete({
                where: { id: userId },
            });
        } catch (error) {
            sendError(res, HttpCodes.INTERNAL_SERVER_ERROR, error);
            return;
        }

        res.status(HttpCodes.NO_CONTENT).send(null);
        return;
    }
    if (req.method == "GET") {
        let users;
        try {
            users = await client.user.findMany();

            res.status(HttpCodes.OK).json(serialize(users));
        } catch (error) {
            sendError(res, HttpCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
