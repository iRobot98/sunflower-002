import { FormInput } from "../subcomponents/utils";

export default function PageTwo({ register, errors }) {
    const {
        email: emailErrors,
        phoneNumber: phoneNumberErrors,
        userName: userNameErrors,
        password: passwordErrors,
        confirmPassword: confirmPasswordErrors,
    } = errors;
    return (
        <div>
            <FormInput
                label="Username"
                iprops={register("userName")}
                errors={userNameErrors}
            />
            <FormInput
                label="Email"
                iprops={{ ...register("email"), type: "email" }}
                errors={emailErrors}
            />
            <FormInput
                label="Phone Number"
                iprops={register("phoneNumber")}
                errors={phoneNumberErrors}
            />
            <FormInput
                label="Password"
                iprops={{ ...register("password"), type: "password" }}
                errors={passwordErrors}
            />
            <FormInput
                label="Confirm Password"
                iprops={{ ...register("confirmPassword"), type: "password" }}
                errors={confirmPasswordErrors}
            />
        </div>
    );
}
