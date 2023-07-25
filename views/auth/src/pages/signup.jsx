import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import { defaultDate, postData } from "../utils";
import PageOne from "../components/sign_up/page_one";

import PageTwo from "../components/sign_up/page_two";
import form_schema from "../components/sign_up/form_schema";
import { SubmitButton } from "../components/subcomponents/utils";

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

    const onSubmit = (data) => {
        const req_data = {
            action: "sign_up",
            data,
        };

        postData(req_data).then((res) => console.log(res));
        reset();
    };
    const Divider = () => (
        <div className="min-h-[4px] w-[50%] mx-auto bg-[gray] my-[.5rem]" />
    );

    return (
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
