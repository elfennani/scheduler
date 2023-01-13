"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import Input from "../../common/components/UI/Input";
import { AiOutlineLogin } from "react-icons/ai";

type Props = {};

const SignInForm = ({}: Props) => {
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const pass = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null | undefined>(null);
    const [isSignin, setIsSignin] = useState(false);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSignin(true);
        try {
            const signInResult = await signIn("credentials", {
                email: email.current?.value,
                password: pass.current?.value,
                redirect: false,
            });

            if (signInResult?.ok) router.push("/dashboard");
            else setError(signInResult?.error);
        } catch (error) {
            setError("Failed to sign in");
        } finally {
            setIsSignin(false);
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            data-testid="signin-form"
            className="mx-auto mt-6 w-96 flex flex-col items-stretch bg-white border-2 p-6 gap-6"
        >
            <h1 className="text-2xl mt-2 text-emerald-900 font-medium flex-row flex items-center gap-2">
                <AiOutlineLogin /> Sign in
            </h1>
            {error && (
                <p role="alert" className="p-4 bg-red-100 text-red-700">
                    Error: {error}
                </p>
            )}
            <Input type="email" ref={email} placeholder="example@domain.xyz">
                Email
            </Input>
            <Input
                type="password"
                ref={pass}
                name="password"
                placeholder="Password"
            >
                Password
            </Input>
            <button
                type="submit"
                disabled={isSignin}
                className="bg-emerald-500 text-white p-2 hover:bg-emerald-600 disabled:border-slate-500 disabled:bg-slate-500 active:bg-emerald-700 border-2 border-emerald-500 transition-all"
            >
                {isSignin ? "Signing in" : "Sign in"}
            </button>
        </form>
    );
};

export default SignInForm;
