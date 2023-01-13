"use client";
import Logo from "@/common/components/UI/Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import SignInForm from "../components/SignInForm";

type Props = {};

const SignIn = (props: Props) => {
    return (
        <div>
            <Logo className="mt-10 mb-16" />
            <SignInForm />
        </div>
    );
};

export default SignIn;
