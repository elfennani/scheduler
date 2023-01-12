import sha256 from "sha256";
import client from "lib/prismadb";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import SignInForm from "@/features/common/components/SignInForm";

type Props = {};

const Signin = async (props: Props) => {
    return (
        <div>
            <SignInForm />
        </div>
    );
};

export default Signin;
