import React from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    secondary?: boolean;
}

const Button = ({ secondary, ...props }: Props) => {
    const className: string = secondary
        ? "bg-transparent text-emerald-500 flex gap-1 items-center p-2 hover:bg-emerald-50 disabled:text-slate-500 disabled:border-slate-500 disabled:bg-slate-100 active:bg-emerald-100 border-2 border-emerald-500 transition-all"
        : "bg-emerald-500 text-white flex gap-1 items-center p-2 hover:bg-emerald-600 disabled:border-slate-500 disabled:bg-slate-500 active:bg-emerald-700 border-2 border-emerald-500 transition-all";

    return (
        <button
            {...props}
            type={props.type || "button"}
            className={`${className} ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
