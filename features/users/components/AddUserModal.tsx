"use client";
import Button from "@/common/components/UI/Button";
import Input from "@/common/components/UI/Input";
import Modal from "@/common/components/UI/Modal";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "repositories/users";

type Props = {
    onClose: () => void;
};

export type AddUserFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "TEACHER" | "STUDENT" | "ADMIN";
    natId: string;
    registrationDate: string;
};

const AddUserModal = (props: Props) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddUserFormData>();

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: (data: AddUserFormData) => {
            return addUser(data);
        },
        onSuccess: (result) => {
            queryClient.setQueryData(["users"], (old: User[] | undefined) => [
                ...(old || []),
                result,
            ]);
            queryClient.invalidateQueries(["users"]);
            props.onClose();
        },
    });

    return (
        <Modal title="Add User" onClose={props.onClose}>
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit((data) => mutate(data))}
            >
                {isError && (
                    <p role="alert" className="p-4 bg-red-100 text-red-700">
                        {error as any}
                    </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="John"
                        {...register("firstName", { required: true })}
                        error={errors.firstName?.message}
                    >
                        First name
                    </Input>
                    <Input
                        type="text"
                        placeholder="Titor"
                        {...register("lastName", { required: true })}
                    >
                        Last name
                    </Input>
                </div>
                <Input
                    type="email"
                    placeholder="example@domain.xyz"
                    {...register("email", { required: true })}
                >
                    Email
                </Input>
                <Input
                    type="password"
                    {...register("password", { required: true })}
                >
                    Password
                </Input>
                <div className="flex flex-col gap-2 text-slate-400 focus-within:text-emerald-500">
                    <h3 className="text-sm ">Role</h3>
                    <div className="flex gap-6 text-slate-900">
                        <label className="flex gap-2 ">
                            <input
                                defaultChecked
                                type="radio"
                                value="STUDENT"
                                {...register("role", { required: true })}
                            />
                            Student
                        </label>
                        <label className="flex gap-2 ">
                            <input
                                type="radio"
                                value="TEACHER"
                                {...register("role", { required: true })}
                            />
                            Teacher
                        </label>
                        <label className="flex gap-2 ">
                            <input
                                type="radio"
                                value="ADMIN"
                                {...register("role", { required: true })}
                            />
                            Admin
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="R123456"
                        {...register("natId", { required: true })}
                    >
                        National ID
                    </Input>
                    <Input
                        type="date"
                        defaultValue={new Date().toLocaleDateString("en-CA")}
                        {...register("registrationDate")}
                    >
                        Registeration Date
                    </Input>
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add"}
                </Button>
            </form>
        </Modal>
    );
};

export default AddUserModal;
