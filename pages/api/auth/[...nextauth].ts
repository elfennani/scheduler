import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import sha256 from "sha256";
import client from "../../../lib/prismadb";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Login",
            credentials: {
                email: {
                    type: "text",
                },
                password: {
                    type: "password",
                },
            },
            authorize: async (credentials, req) => {
                const prisma = client;
                if (!credentials || !prisma) return null;

                const user: User | null = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: sha256(credentials.password),
                    },
                });

                if (user)
                    return {
                        id: user.id,
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                    };

                return null;
            },
        }),
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = (user as any).role;
            }

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
};

export default NextAuth(authOptions);
