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

const Section = ({
    children,
    next,
    prev,
    page_no,
    hasErrors,
    maxPages,
    currentPage,
}) => {
    const Button = ({ onClick, children }) => (
        <div
            className="p-2 rounded-md  border-2 w-full flex-initial cursor-pointer flex-center m-auto"
            onClick={onClick}
        >
            {children}
        </div>
    );
    const prev_ = currentPage != 0;
    const next_ = currentPage < maxPages - 1;
    const visibility = currentPage == page_no;
    return (
        <div className={visibility ? "visible" : "hidden"}>
            {children}

            <div className="h-[1px] my-[1px] w-full bg-gray-400 rounded-sm" />
            <div className="p-2 flex">
                {prev_ && <Button onClick={() => prev()}>Prev</Button>}
                {prev_ && next_ && <div className="w-[2rem]" />}
                {next_ && (
                    <Button
                        onClick={() => {
                            if (!hasErrors) next();
                        }}
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
};

const generate_next_prev = (max_, page_, setPage) => {
    const max = max_ - 1;
    const next = () => {
        setPage(page_ >= max ? max : page_ + 1);
        // console.log(formPage);
    };
    const prev = () => {
        setPage(page_ <= 0 ? 0 : page_ - 1);
        // console.log(formPage);
    };
    return {
        next,
        prev,
    };
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
    const maxPages = 3;

    const { next, prev } = generate_next_prev(maxPages, formPage, setPage);
    const countErrors = () => {
        let k_s = Object.keys(errors);
        let e_s = 0;
        for (let k of k_s) e_s += errors[k_s]?.length;
        return e_s;
    };
    return (
        <Layout>
            <div className="form_ flex-center flex-col pt-[1rem]">
                <h3 className="text-[2rem] ">Sign Up</h3>
                <form action="POST" ref={ref} onSubmit={handleSubmit}>
                    {/* firstname middlename lastname dob */}
                    <Section
                        next={next}
                        prev={prev}
                        currentPage={formPage}
                        maxPages={maxPages}
                        page_no={0}
                    >
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
                        currentPage={formPage}
                        maxPages={maxPages}
                        page_no={1}
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

                    {/* confirmation code? */}
                    <Section
                        next={next}
                        prev={prev}
                        currentPage={formPage}
                        maxPages={maxPages}
                        page_no={2}
                    >
                        <FormInput
                            name="username"
                            type="text"
                            iprops={{
                                initialValue: "hey",
                            }}
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

                    <div className="flex flex-row-reverse">
                        <div
                            onClick={handleSubmit}
                            className={`${
                                countErrors() ? "bg-[#4ab44a]" : "bg-[green]"
                            } text-white m-2 py-2 px-4 rounded-md cursor-pointer`}
                        >
                            Submit
                        </div>
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
