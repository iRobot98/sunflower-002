export const Logo = ({ className }) => (
    <div className={className}>
        <img
            src="/assets/images/logo.png"
            className="h-[2rem] w-[2rem] rounded-md "
            alt=""
        />
    </div>
);

export const captureValuesUsingRef = (ref) => {
    let values = {};
    const keys = Object.keys(ref.current).filter((v) => !v.startsWith("_"));
    // console.log("keys\n", keys);
    const vals = keys.map((v) => ({
        name: ref.current[v]?.name,
        value: ref.current[v]?.value,
    }));
    // .filter((v) => v.name);
    vals.map((v) => (values[v.name] = v.value));
    return values;
};
