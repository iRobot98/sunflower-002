const fs = require("fs");
const path = require("path");
const {
  invalid_dirs,
  invalid_exts,
  invalid_files,
  valid_dirs,
} = require("../../server.settings");
const { splitUrl } = require("./001");



const has_invalid_dirs = (path_ = "./") => {
  // console.log(path_);
  const j = path_.split("/");
  for (let k of j) if (invalid_dirs.includes(k)) return true;
  return false;
};

const dirs_1 = (p_ = ".") =>
  fs
    .readdirSync(p_, { withFileTypes: true })
    .filter((v) => v.isDirectory())
    .map((v) => `${p_}/${v.name}`);

const dirs_2 = (p_ = ".") => {
  let d_02 = ["."];
  for (let i = 0, k = d_02[0]; i < d_02.length; i++, k = d_02[i]) {
    if (!has_invalid_dirs(k)) {
      d_02.push(...dirs_1(k));
    }
  }

  return d_02;
};

const has_invalid_ext = (pf_ = ".") => {
  for (let k of invalid_exts) {
    if (pf_.endsWith(k)) return true;
  }
  return false;
};

const is_invalid_file = (pf_ = ".") => {
  const j = pf_.split("/");
  const n = j.pop();
  for (let k of invalid_files) {
    if (invalid_files.includes(n)) return true;
  }
  return false;
};

const files_1 = (pf_ = ".") =>
  fs
    .readdirSync(pf_, { withFileTypes: true })
    .filter((v) => !v.isDirectory())
    .map((v) => `${pf_}/${v.name}`)
    .filter((v) => !has_invalid_ext(v) && !is_invalid_file(v));

let store = {
  files: (() => {
    let res = [];
    dirs_2()
      .map((v) => files_1(v))
      .forEach((v) => {
        res.push(...v);
      });
    return res;
  })(),
  dirs: dirs_2(),
};

const getExts = () => {
  const a = store.files.map((v) => splitUrl(v).ext);
  const b = (() => {
    let j = [];
    for (let it of a)
      if (j.includes(it)) {
        continue;
      } else {
        j.push(it);
      }
    return j;
  })();
  return b;
};

const valid_asset_Files = {
  js: [],
  ico: [],
  png: [],
  css: [],

  json: [],

  jpg: [],
  map: [],
  less: [],
  yml: [],
  scss: [],
  svg: [],
  ttf: [],
  woff2: [],
};

const updateValidAssetFiles = () => {
  let keys = Object.keys(valid_asset_Files);
  let valid_directories = store.files.filter((v) => {
    for (let k of valid_dirs) if (v.includes(k)) return true;
    return false;
  });
  // console.log(valid_directories);
  for (let k of keys) {
    for (let kf of valid_directories.filter((v) => v.endsWith(k))) {
      if (!valid_asset_Files[k].includes(kf)) valid_asset_Files[k].push(kf);
    }
  }
  // for (let i of store.files) {
  //   let j = splitUrl(i);
  //   if (!valid_asset_Files[j.ext].includes(i)) valid_asset_Files[j.ext].push(i);
  // }
};
updateValidAssetFiles();

setInterval(() => {
  store = {
    files: dirs_2()
      .map((v) => files_1(v))
      .flat(),
    dirs: dirs_2(),
  };
  updateValidAssetFiles();
}, 60 * 30 * 1000);
// console.log(getExts());

module.exports = {
  store,
  valid_asset_Files,
};

// console.log(store)