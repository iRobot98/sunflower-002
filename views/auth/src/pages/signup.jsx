import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import { defaultDate, postData } from "../utils";
import PageOne from "../components/sign_up/page_one";

import PageTwo from "../components/sign_up/page_two";
import form_schema from "../components/sign_up/form_schema";

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
                <PageTwo register={register} errors={errors} />
                <div className="flex flex-row-reverse">
                    <button
                        type="submit"
                        className="bg-[green] text-white rounded-md hover:font-bold px-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
}
