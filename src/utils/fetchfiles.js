const fs = require("fs");
const {
    invalid_dirs,
    invalid_files,
    invalid_exts,
    valid_dirs,
} = require("../../server.settings");
const { splitUrl } = require("./001");

const read_dirs = (path_ = "/") =>
    fs.readdirSync(path_, { withFileTypes: true });

const get_name =
    (path_) =>
    ({ name }) =>
        `${path_}/${name}`
            .split("/")
            .filter((v) => v.length)
            .join("/");
// ({ name }) =>
// `${path_}/${name}`
//     .split("/")
//     .filter((v) => v.length)
//     .join("/")

const get_dirs = (path_ = "/") => {
    return read_dirs(path_)
        .filter((v) => v.isDirectory())
        .map(get_name(path_));
};

const is_invalid_dir = (path_ = "") => {
    // console.log(path_);
    for (let invalid of invalid_dirs) {
        for (let valid of valid_dirs) {
            if (path_.includes(invalid) && !path_.includes(valid)) return true;
        }
    }
    return false;
};
const get_dirs_recursive = (path_ = "/") => {
    let start = get_dirs(path_);
    for (let dir of start)
        if (!is_invalid_dir(dir)) start.push(...get_dirs(dir));

    return start;
};

const get_files = (path_ = "/") => {
    return read_dirs(path_)
        .filter((v) => !v.isDirectory())
        .map(get_name(path_));
    // .filter((v) => !is_invalid_dir(v));
};

const is_invalid_file = (path_ = "/") => {
    const { ext } = splitUrl(path_);
    if (invalid_exts.includes(ext)) return true;
    for (let invalid of invalid_files) {
        if (path_.includes(invalid)) return true;
    }
    return false;
};
const get_files_recursive = (path_ = "/") => {
    let dirs = get_dirs_recursive(path_);
    let files = [""];
    for (let dir of dirs) {
        let f_ = get_files(dir).filter((v) => !is_invalid_file(v));
        files.push(...f_);
    }
    return files;
};

// const exts = (() =>
//     new Set(get_files_recursive("views").map((v) => splitUrl(v).ext)))();

const valid_assets = {
    json: [],
    js: [],
    ico: [],
    png: [],
    css: [],
    svg: [],
    gif: [],
    jpg: [],
    less: [],
    scss: [],
    ttf: [],
    woff2: [],
    map: [],
};

const all_files = get_files_recursive("views");

const fill_valid_files = () => {
    for (let a of all_files) {
        let { ext } = splitUrl(a);
        if (valid_assets[ext]) valid_assets[ext].push(a);
        // console.log(a);
    }
};
fill_valid_files();
// console.log(valid_assets);

module.exports = {
    all_files,
    valid_assets,
    valid_exts: Object.keys(valid_assets),
};
