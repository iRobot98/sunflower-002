import React, { useRef, useState } from "react";
import Layout from "../components/layout";

function SignUp(props) {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <Layout>
            <div className="form_ ">
                <div>
                    <form className="bg-[grey] min-h-[5rem] rounded-md flex justify-between flex-col"></form>
                </div>
            </div>
        </Layout>
    );
}

export default SignUp;
