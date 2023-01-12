"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
    console.log(useSession());
    return (
        <div>
            SignIn{" "}
            <button
                onClick={() =>
                    signIn("credentials", {
                        email: "elfennani2003@gmail.com",
                        password: "nizar2003",
                    })
                }
            >
                Sign in
            </button>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default SignIn;
