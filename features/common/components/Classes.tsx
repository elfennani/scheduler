"use client";
import { Branch, Class } from "@prisma/client";
import React from "react";
import { useQuery } from "react-query";

type Props = {
    classes: (Class & {
        branch: Branch;
    })[];
};

const Classes = ({ classes }: Props) => {
    const { data, isLoading, isError } = useQuery(
        ["classes"],
        async () =>
            (await fetch("/api/classes")).json() as unknown as (Class & {
                branch: Branch;
            })[],
        {
            initialData: classes,
        }
    );

    if (isError) return <div>Error</div>;
    if (isLoading || !data) return <div>Loading...</div>;

    return (
        <ul>
            {data.map((cls) => (
                <li key={cls.id}>
                    {cls.label}
                    <ul>
                        <li>
                            <b>Year:</b>
                            {cls.year}
                        </li>
                        <li>
                            <b>Branch:</b>
                            {cls.branch.name}
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default Classes;
