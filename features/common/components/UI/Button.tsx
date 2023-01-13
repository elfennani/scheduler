import React from "react";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = (props: Props) => {
    return (
        <button
            {...props}
            type={props.type || "button"}
            className={`bg-emerald-500 text-white p-2 hover:bg-emerald-600 disabled:border-slate-500 disabled:bg-slate-500 active:bg-emerald-700 border-2 border-emerald-500 transition-all ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
