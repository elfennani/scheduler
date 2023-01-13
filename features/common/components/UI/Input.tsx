import React, { ForwardedRef, Ref } from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    children?: string;
}

const Input = React.forwardRef((props: Props, ref: any) => (
    <label className="flex flex-col text-sm text-slate-400 gap-1 focus-within:text-emerald-500">
        {props.children}
        <input
            {...{ ...props, children: undefined }}
            ref={ref}
            className={`text-slate-900 p-2 border-2 text-base border-slate-200 outline-none focus:border-emerald-500  focus:bg-emerald-50 transition-all ${props.className}`}
        />
    </label>
));

Input.displayName = "Input";

export default Input;
