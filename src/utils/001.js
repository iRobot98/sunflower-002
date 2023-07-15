const removeDuplicates = (list = []) => {
    const done = [];
    return list.filter((v) => {
        if (done.includes(v)) return false;
        done.push(v);
        return true;
    });
};

const splitUrl = (url_ = "/") => {
    const split = url_.split("/").filter((v) => v.length);
    const last = [...split].pop();
    const ext = String(last).split(".").pop();
    return {
        url_,
        split,
        last,
        ext,
    };
};

// resolves after a prespecified period of time
const wait = async (time_in_s = 1) => {
    await new Promise((resolve, r) => {
        setTimeout(() => resolve(), time_in_s * 1000);
    });
};

const wait_loop = (num = 10) => {
    wait(num).then(wait_loop);
};

module.exports = {
    removeDuplicates,
    splitUrl,
    wait,
    wait_loop,
};
