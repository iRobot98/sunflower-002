export const postData = async (data, url = "/api/auth") => {
    return await fetch(url, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((e) => {
            console.log(e.message);
            return { errors: e.message };
        });
};

export const captureValuesUsingRef = (ref) => {
    let values = {};
    const keys = Object.keys(ref.current).filter(
        (v) => !v.startsWith("_") && v.length
    );
    // console.log("keys\n", keys);
    const vals = keys.map((v) => ({
        name: ref.current[v]?.name,
        value: ref.current[v]?.value,
    }));
    // .filter((v) => v.name);
    vals.map((v) => (values[v.name] = v.value));
    return values;
};

export const defaultDate = () => {
    const t = new Date();
    const mm = t.getMonth().toString();
    const dd = t.getDate().toString();
    const getDouble = (dn) => (dn.length === 2 ? dn : "0" + dn);
    return `${(t.getFullYear() - 18).toString()}-${getDouble(mm)}-${getDouble(
        dd
    )}`;
};
