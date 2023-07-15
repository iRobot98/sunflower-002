import React, { useRef, useState } from "react";
import Layout from "../components/layout";

import { captureValuesUsingRef, defaultDate, postData } from "../utils";

function FormInput(props) {
    const { label, name, type, errors, iprops } = props;
    const err = errors[name];
    return (
        <div className="forminput">
            <h3>{label}</h3>
            <input type={type} name={name} autoComplete="off" {...iprops} />
            {err &&
                err.map((v, i) => <div key={`${name}_error_${i}`}>{v}</div>)}
        </div>
    );
}

const Section = ({ children, next, prev, visibility }) => {
    const Button = ({ onClick, children }) => (
        <div
            className="p-2 rounded-md  border-2 flex-1 cursor-pointer flex-center m-auto"
            onClick={onClick}
        >
            {children}
        </div>
    );
    return (
        <div className={visibility ? "visible" : "hidden"}>
            {children}

            <div className="h-[1px] my-[1px] w-full bg-gray-400 rounded-sm" />
            <div className="p-2 flex">
                {prev && <Button onClick={() => prev()}>Prev</Button>}
                {prev && next && <div className="w-[2rem]" />}
                {next && <Button onClick={() => next()}>Next</Button>}
            </div>
        </div>
    );
};

export default function SignUp(props) {
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
    // const [accepted, setAccepted] = useState(false);

    // const validateData = () => {};
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ref);

        const values = captureValuesUsingRef(ref);
        console.log("values:\n", values);

        postData(values).then((res) => console.log(res));
    };
    const [formPage, setPage] = useState(0);
    const max = 2;
    const next = () => {
        setPage(formPage >= 2 ? 2 : formPage + 1);
        // console.log(formPage);
    };
    const prev = () => {
        setPage(formPage <= 0 ? 0 : formPage - 1);
        // console.log(formPage);
    };
    return (
        <Layout>
            <div className="form_ flex-center flex-col pt-[1rem]">
                <h3 className="text-[2rem] ">Sign Up</h3>
                <form action="POST" ref={ref} onSubmit={handleSubmit}>
                    {/* firstname middlename lastname dob */}
                    <Section next={next} visibility={formPage == "0"}>
                        <FormInput
                            name="firstname"
                            type="text"
                            errors={errors}
                            label="First Name"
                        />
                        <FormInput
                            name="middlename"
                            type="text"
                            errors={errors}
                            label="Middle Name"
                        />
                        <FormInput
                            name="lastname"
                            type="text"
                            errors={errors}
                            label="Last Name"
                        />
                        <FormInput
                            name="dateofbirth"
                            type="date"
                            errors={errors}
                            label="Date of Birth"
                            iprops={{
                                defaultValue: defaultDate(),
                            }}
                        />
                    </Section>
                    {/* username phonenumber email */}
                    <Section
                        next={next}
                        prev={prev}
                        visibility={formPage == "1"}
                    >
                        <FormInput
                            name="username"
                            type="text"
                            errors={errors}
                            label="User Name"
                        />
                        <FormInput
                            name="phonenumber"
                            type="text"
                            errors={errors}
                            label="Phone Number"
                        />
                        <FormInput
                            name="Email"
                            type="email"
                            errors={errors}
                            label="Email"
                        />
                    </Section>

                    {/* username password resetpassword */}
                    <Section prev={prev} visibility={formPage == "2"}>
                        <FormInput
                            name="username"
                            type="text"
                            errors={errors}
                            label="User Name"
                        />
                        <FormInput
                            name="password"
                            type="password"
                            errors={errors}
                            label="Password"
                        />
                        <FormInput
                            name="repeatpassword"
                            type="password"
                            errors={errors}
                            label="Reenter password"
                        />
                    </Section>

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
