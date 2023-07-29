export const Logo = ({ className }) => (
    <div className={className}>
        <img
            src="/assets/images/logo.png"
            className="h-[2rem] w-[2rem] rounded-md "
            alt=""
        />
    </div>
);

export const FormInput = ({ label, iprops, errors }) => {
    return (
        <div className="mx-auto forminput my-2">
            <h3 className="text-[gray]  font-semibold">{label}</h3>
            <input {...iprops} className="" />
            <div className="flex flex-col font-thin text-sm text-red-500">
                {errors && errors.message}
            </div>
        </div>
    );
};

export const SubmitButton = ({ text, ...props }) => {
    return (
        <div className="flex flex-row-reverse">
            <button
                type="submit"
                props={{ ...props }}
                className="bg-[green] min-h-[2rem] text-white rounded-md hover:font-bold hover:px-[0.90rem] px-[1rem]"
            >
                {text}
            </button>
        </div>
    );
};
