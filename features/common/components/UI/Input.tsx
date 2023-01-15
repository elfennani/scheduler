import React, { ForwardedRef, ReactNode, Ref } from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    children?: ReactNode | ReactNode[];
    error?: string;
}

const Input = React.forwardRef(
    ({ children, error, ...props }: Props, ref: any) => (
        <label
            className={`flex flex-col text-sm text-slate-400 gap-1 focus-within:text-emerald-500 ${
                error && "!text-red-500"
            }`}
        >
            {children}
            <input
                {...{ ...props, children: undefined }}
                ref={ref}
                className={`text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:focus:bg-emerald-900 dark:text-white p-2 border-2 text-base border-slate-200 outline-none focus:border-emerald-500  focus:bg-emerald-50 transition-all ${
                    props.className
                } ${error && "!text-red-500 !border-red-500 !bg-red-50"}`}
            />
            {error && (
                <p className="text-red-500 text-sm  text-right">{error}</p>
            )}
        </label>
    )
);

Input.displayName = "Input";

export default Input;
