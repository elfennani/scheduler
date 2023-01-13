import sha256 from "sha256";
import client from "lib/prismadb";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import SignInForm from "@/auth/components/SignInForm";
import SignIn from "@/auth/pages/SignIn";

type Props = {};

const Signin = async (props: Props) => {
    return <SignIn />;
};

export default Signin;
