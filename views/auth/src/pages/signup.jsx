import React, { useRef } from "react";

import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { postData } from "../utils";

const FormInput = ({ label, iprops }) => {
    return (
        <div className="mx-auto forminput my-2">
            <h3 className="text-[gray]  font-semibold">{label}</h3>
            <input {...iprops} className="" />
        </div>
    );
};

const Page_1 = ({ register, errors }) => {
    // form validation rules
    const validationSchema = Yup.object().shape({
        dob: Yup.string()
            .required("Date of Birth is required")
            .matches(
                /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                "Date of Birth must be a valid date in the format YYYY-MM-DD"
            ),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    return (
        <div>
            <FormInput
                label="First Name"
                iprops={register("firstName", {
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                    pattern: /^[A-Za-z]+$/i,
                })}
                errors={errors["firstName"]}
            />
            <FormInput
                label="Middle Name"
                iprops={register("middleName", {
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                    pattern: /^[A-Za-z]+$/i,
                })}
                errors={errors["middleName"]}
            />
            <FormInput
                label="Last Name"
                iprops={register("lastName", {
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                    pattern: /^[A-Za-z]+$/i,
                })}
                errors={errors["lastName"]}
            />
            <FormInput
                label="Date of Birth"
                iprops={{
                    ...register("DateOfBirth", {
                        required: true,
                    }),
                    type: "date",
                }}
                errors={errors["DateOfBirth"]}
            />
        </div>
    );
};

function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const req_data = {
            action: "sign_up",
            data,
        };
        console.log(req_data);
        postData(req_data).then((res) => console.log(res));
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
                <Page_1 register={register} errors={errors} />

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
