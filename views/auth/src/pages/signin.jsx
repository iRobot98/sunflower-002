import React, { useRef, useState } from "react";
import Layout from "../components/layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput, SubmitButton } from "../components/subcomponents/utils";
import { postData } from "../utils";
import { Navigate } from "react-router-dom";

const form_schema = z.object({
    username: z
        .string()

        .min(3, "too short")
        .regex(/[A-Za-z'0-9@.\+]+/, "invalid character in username"),
    password: z
        .string()
        .min(4, "Password is too short")
        .max(20, "Password is too long")
        .regex(/(?=.*?[A-Z])/, "invalid password")
        .regex(/(?=.*?[a-z])/, "invalid password")
        .regex(/(?=.*?[0-9])/, "invalid password"),
});

function SignIn(props) {
    const {
        register,
        handleSubmit,

        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(form_schema),
    });

    const [NavigateTo, setNavigateTo] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
        postData({
            action: "sign_in",
            data,
        }).then((res) => {
            const { success } = res;
            if (success == true) {
                reset();
                setNavigateTo(true);
            }
            console.log(res);
        });
    };

    const [toSignUp, setSignUp] = useState(false);
    return NavigateTo ? (
        <Navigate to="/app/" />
    ) : (
        <Layout>
            <div className="mx-auto min-h-[6rem] font-bold flex-center">
                <h2 className="text-[2rem] text-[#003cffab]">Sign In</h2>
            </div>
            <form
                action="post"
                className="form_ mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    label="Username or Email or Phonenumber"
                    errors={errors["username"]}
                    iprops={register("username")}
                />
                <FormInput
                    label="Password"
                    errors={errors["password"]}
                    iprops={{ ...register("password"), type: "password" }}
                />

                <a
                    className="text-[#75adf6] hover:text-[#6150c3] text-md my-[1rem]"
                    href="/auth/sign_up"
                >
                    Don't have an account? Sign Up...
                </a>

                <SubmitButton text="Sign In" />
            </form>
        </Layout>
    );
}

export default SignIn;
