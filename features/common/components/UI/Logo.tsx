import React from "react";
import styled from "styled-components";

type Props = {
    compact?: boolean;
    className?: string;
};

const Logo = ({ compact = false, className }: Props) => {
    return (
        <h1
            className={`font-medium text-4xl text-emerald-900 text-center ${className}`}
            data-testid="logo"
        >
            {compact ? (
                <span className="text-emerald-500 font-bold">Sc</span>
            ) : (
                <>
                    <span className="text-emerald-500 font-bold">Sc</span>
                    heduler
                </>
            )}
        </h1>
    );
};

export default Logo;
