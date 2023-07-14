import React, { useRef, useState } from "react";
import Layout from "../components/layout";

function SignIn(props) {
    const ref = useRef();
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const changeUsername = ({ target: { value } }) => {
        setData({ ...data, username: value });
    };
    const changePassword = ({ target: { value } }) => {
        setData({ ...data, password: value });
    };
    return <Layout>Log In</Layout>;
}

export default SignIn;
