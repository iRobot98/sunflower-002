const express = require("express");
const filesList = require("./utils/fetch_files");
const { splitUrl } = require("./utils/001");
const fs = require("fs");
const router = express.Router();

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

module.exports = router;
