import React, { useRef } from "react";

import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureValuesUsingRef, postData } from "../utils";

const date_regex = /(\d{4})-(0[1-9]|1[12])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;

const date_regex_general = /(\d{4})-(\d{2})-(\d{2})/;
const date_regex_year = /(19[456789][0-9]|20[01][0-9])-(\d{2})-(\d{2})/;
const date_regex_month = /(\d{4})-(0[0-9]|1[012])-(\d{2})/;
const date_regex_day = /(\d{4})-(\d{2})-(0[123456789]|[12][0-9]|3[01])/;
const date_regex_february =
    /(\d{4})-(0[0-9^2]|1[012])-(\d{2})|(\d{4})-(02)-(0[123456789]|[12][0-9])/;

const FormSchema = z.object({
    firstName: z
        .string()
        .min(3, "Entered name is too short")
        .max(20, "Entered name is too long")
        .regex(/^[A-Za-z]+$/i, "Please use letters only"),
    middleName: z
        .string()
        .min(3, "Entered name is too short")
        .max(20, "Entered name is too long")
        .regex(/^[A-Za-z]+$/i, "Please use letters only"),
    lastName: z
        .string()
        .min(3, "Entered name is too short")
        .max(20, "Entered name is too long")
        .regex(/^[A-Za-z]+$/i, "Please use letters only"),
    DateOfBirth: z
        .string()
        .regex(date_regex_general, "Date of Birth must be a valid date")
        .regex(date_regex_year, "Please enter a year between 1940 and 2019")
        .regex(date_regex_month, "Please give a valid month")
        .regex(date_regex_day, "Please give a valid day")
        .regex(
            date_regex_february,
            "February only has a maximum of 29 days on leap years"
        ),
    // email: z.string().email(),
});

const FormInput = ({ label, iprops, errors }) => {
    return (
        <div className="mx-auto forminput my-2">
            <h3 className="text-[gray]  font-semibold">{label}</h3>
            <input {...iprops} className="" />
            <div className="flex flex-col font-thin text-sm text-red-500">
                {errors && errors.message}
            </div>
        </div>
    );
};

const PageOne = ({ register, errors }) => {
    return (
        <div>
            <FormInput
                label="First Name"
                iprops={register("firstName")}
                errors={errors["firstName"]}
            />
            <FormInput
                label="Middle Name"
                iprops={register("middleName")}
                errors={errors["middleName"]}
            />
            <FormInput
                label="Last Name"
                iprops={register("lastName")}
                errors={errors["lastName"]}
            />
            <FormInput
                label="Date of Birth"
                iprops={{
                    ...register("DateOfBirth"),
                    type: "date",
                }}
                errors={errors["DateOfBirth"]}
            />
        </div>
    );
};

const PageTwo = ({ register, errors }) => {
    return <div></div>;
};

function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
    });

    const ref = useRef();

    const onSubmit = (data) => {
        const req_data = {
            action: "sign_up",
            data,
        };
        console.log(req_data);
        postData(req_data).then((res) => console.log(res));
    };
    if (errors) {
        console.log(errors);
    }

    return (
        <Layout>
            <div className="mx-auto min-h-[6rem] font-bold flex-center">
                <h2 className="text-[2rem] text-[#003cffab]">Sign Up</h2>
            </div>

            <form
                action="post"
                className="form_ mx-auto"
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
            >
                <PageOne register={register} errors={errors} />

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

export default SignUp;
