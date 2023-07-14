import React, { useRef, useState } from "react";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import { captureValuesUsingRef } from "../components/subcomponents/utils";

function FormInput({ label, name, type, errors, handleChange }) {
    return (
        <div className="forminput">
            <h3>{label}</h3>
            <input type={type} name={name} autoComplete="off" />
            {errors && errors.map((v) => <div>{v}</div>)}
        </div>
    );
}

function Button({ text, onClick }) {
    return (
        <div onClick={onClick}>
            <h3>{text}</h3>
        </div>
    );
}

function Step1(props) {
    return <div>Step 1</div>;
}

function SignUp(props) {
    const ref = useRef();

    const [errors, setErrors] = useState({
        firstname: [""],
        middlename: [""],
        lastname: [""],
        username: [""],
        phonenumber: [""],
        email: [""],

        password: [""],
        repeatpassowrd: [""],
    });
    const [data, setData] = useState({});

    const validateData = () => {};
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ref);

        const values = captureValuesUsingRef(ref);
        console.log("values:\n", values);
    };

    return (
        <Layout>
            <div className="form_ flex-center flex-col pt-[1rem]">
                <h3 className="text-[2rem] ">Sign Up</h3>
                <form action="POST" ref={ref} onSubmit={handleSubmit}>
                    <FormInput
                        name="firstname"
                        type="text"
                        errors={[]}
                        label="First Name"
                    />
                    <FormInput
                        name="middlename"
                        type="text"
                        errors={[]}
                        label="Middle Name"
                    />
                    <FormInput
                        name="lastname"
                        type="text"
                        errors={[]}
                        label="Last Name"
                    />
                    <div className="h-[1px] my-2 w-full bg-gray-500" />
                    <FormInput
                        name="username"
                        type="text"
                        errors={[]}
                        label="User Name"
                    />
                    <FormInput
                        name="phonenumber"
                        type="text"
                        errors={[]}
                        label="Phone Number"
                    />
                    <FormInput
                        name="Email"
                        type="text"
                        errors={[]}
                        label="Email"
                    />
                    <div className="h-[1px] my-2 w-full bg-gray-500" />

                    <FormInput
                        name="password"
                        type="password"
                        errors={[]}
                        label="Password"
                    />
                    <FormInput
                        name="repeatpassword"
                        type="password"
                        errors={[]}
                        label="Reenter password"
                    />
                    <div className="flex">
                        <div
                            onClick={handleSubmit}
                            className="bg-[blue] text-white m-2 py-2 px-4 rounded-md"
                        >
                            Submit
                        </div>

                        <button>Submit_</button>
                    </div>
                </form>
                {/* 
                First name
                Middle Name
                Last Name
                username

                profile:
                    profile_name
                    Phone number(s)
                    Email
                    Location

                password
                repeat passowrd
                */}
            </div>
        </Layout>
    );
}

export default SignUp;
