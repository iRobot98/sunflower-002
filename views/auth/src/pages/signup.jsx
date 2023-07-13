import React from "react";
import Layout from "../components/layout";

function FormInput({ name, label, value, type, placeholder }) {
    return (
        <div className="flex-center m-2 ">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                className="mx-2 rounded-md p-[.2rem]"
                type={type}
                id={name}
                name={name}
                onChange={(e) => (value = e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

function SignUp(props) {
    const data = {
        username: "",
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(data);
    };
    return (
        <Layout>
            <div className="form_ ">
                <div>
                    <form
                        className="bg-[grey] min-h-[5rem] rounded-md flex justify-between flex-col"
                        onSubmit={onSubmit}
                    >
                        <FormInput
                            name="username"
                            type="text"
                            value={data["username"]}
                            label="username"
                        />

                        <button
                            className="p-2 bg-red-700 text-white rounded-md"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default SignUp;
