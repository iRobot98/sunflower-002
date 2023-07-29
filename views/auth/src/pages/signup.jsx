import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import { defaultDate, postData } from "../utils";
import PageOne from "../components/sign_up/page_one";

import PageTwo from "../components/sign_up/page_two";
import form_schema from "../components/sign_up/form_schema";
import { SubmitButton } from "../components/subcomponents/utils";
import { Navigate, Router } from "react-router-dom";
import UserAlreadyExists from "./UserAlreadyExists";

export default function SignUp() {
    const {
        register,
        handleSubmit,

        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            DateOfBirth: defaultDate(),
        },
        resolver: zodResolver(form_schema),
    });

    const [userExists, setUserExists] = useState(false);
    const onSubmit = (data) => {
        const req_data = {
            action: "sign_up",
            data,
        };

        postData(req_data).then((res) => {
            const { success, data, error } = res;
            if (success == true) {
                // set token in cookie
                const { token, user } = data;
                if (token) {
                    document.cookie = `jwt_token=${token}`;
                    // reset();
                }
                localStorage.setItem("User", JSON.stringify(user));
            } else {
                switch (error.error.toString()) {
                    case "user exists":
                        setUserExists(true);
                        break;
                    default:
                }
            }

            console.log(res);
        });
    };
    const Divider = () => (
        <div className="min-h-[4px] w-[50%] mx-auto bg-[gray] my-[.5rem]" />
    );

    return userExists ? (
        <UserAlreadyExists />
    ) : (
        <Layout>
            <div className="mx-auto min-h-[6rem] font-bold flex-center">
                <h2 className="text-[2rem] text-[#003cffab]">Sign Up</h2>
            </div>

            <form
                action="post"
                className="form_ mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <PageOne register={register} errors={errors} />
                <Divider />
                <PageTwo register={register} errors={errors} />
                <Divider />
                <SubmitButton text="Sign Up" />
            </form>
        </Layout>
    );
}
