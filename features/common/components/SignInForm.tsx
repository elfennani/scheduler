"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

type Props = {};

const SignInForm = ({}: Props) => {
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const pass = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null | undefined>(null);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signInResult = await signIn("credentials", {
            email: email.current?.value,
            password: pass.current?.value,
            redirect: false,
        });

        if (signInResult?.ok) router.push("/dashboard");
        else setError(signInResult?.error);
    };

    return (
        <form onSubmit={submitHandler} data-testid="myform">
            <h1>Sign in form</h1>
            <input type="email" ref={email} placeholder="example@domain.xyz" />
            <input
                type="password"
                ref={pass}
                name="password"
                placeholder="Password"
            />
            <button type="submit">Sign in</button>
            {error && <p className="error">Error: {error}</p>}
        </form>
    );
};

export default SignInForm;
