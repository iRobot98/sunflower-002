import { FormInput } from "../subcomponents/utils";

export default function PageOne({ register, errors }) {
    let {
        firstName: firstNameErrors,
        middleName: middleNameErrors,
        lastName: lastNameErrors,
        DateOfBirth: DateOfBirthErrors,
    } = errors;

    return (
        <div>
            <FormInput
                label="First Name"
                iprops={register("firstName")}
                errors={firstNameErrors}
            />
            <FormInput
                label="Middle Name"
                iprops={register("middleName")}
                errors={middleNameErrors}
            />
            <FormInput
                label="Last Name"
                iprops={register("lastName")}
                errors={lastNameErrors}
            />
            <FormInput
                label="Date of Birth"
                iprops={{
                    ...register("DateOfBirth"),
                    type: "date",
                }}
                errors={DateOfBirthErrors}
            />
        </div>
    );
}
