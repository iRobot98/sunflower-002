import React, { useState } from "react";
import Layout from "../components/layout";
import { SubmitButton } from "../components/subcomponents/utils";

function UserAlreadyExists(props) {
    return (
        <Layout>
            <div className="flex-center h-screen w-full">
                <div className="form_ ">
                    <h2 className="text-[1.5rem] mx-auto">
                        User Already Exists
                    </h2>

                    <a href="/auth/signin">
                        <SubmitButton text="Sign in" />
                    </a>
                </div>
            </div>
        </Layout>
    );
}

export default UserAlreadyExists;
