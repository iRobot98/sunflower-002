const express = require("express");
const filesList = require("./utils/fetch_files");
const { splitUrl } = require("./utils/001");
const fs = require("fs");
const router = express.Router();

// router.use("*", (req, res, callNext) => {
//   const { method, ip, originalUrl } = req;

//   res.on("finish", () => {
//     const { statusCode } = res;
//     console.log(`${statusCode} ${method} ${originalUrl} ${ip}`);
//   });
//   callNext();
// });

let files_dictionary = {};
router.get("*", (req, res, callNext) => {
    const { originalUrl } = req;
    if (originalUrl.includes("/api/")) {
        callNext();
        return;
    }
    const split = splitUrl(originalUrl);
    if (files_dictionary[originalUrl]) {
        let k = files_dictionary[originalUrl];
        res.type(split.ext);
        res.send(fs.readFileSync(k));
        return;
    }

    if (!originalUrl.includes("index")) {
        let valid_files = filesList.valid_asset_Files[split.ext];
        if (valid_files) {
            for (let k of valid_files) {
                if (k.endsWith(split.last)) {
                    res.type(split.ext);
                    res.send(fs.readFileSync(k));
                    files_dictionary[originalUrl];
                    return;
                }
            }
        }
    }

    callNext();
});

// router.get("/*", (req, res, callNext) => {
//   const { originalUrl } = req;
//   let a_001 = originalUrl
//     .split("/")
//     .filter((v) => v.length < 1)
//     .map((v) => v.toLowerCase());
//   let a_002 = 0;
//   for (let url_ of a_001) {
//     switch (url_) {
//       case "home":
//       case "api":
//       case "blog":
//       case "core-values":
//       case "about-us":
//       case "images":
//       case "gallery":
//         a_002++;
//         break;
//       default:
//     }
//   }
//   if (a_002 > 2) {
//     let a_003 = [];
//     let i = 0;
//     for (let k of a_001) {
//       if (i < a_002 - 1) {
//         a_003.push("..");
//       } else {
//         a_003.push(k);
//       }
//     }
//     res.redirect(a_003.join("/"));
//   } else {
//     callNext();
//   }
// });

module.exports = router;