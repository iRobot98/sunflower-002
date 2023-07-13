const express = require("express");
const filesList = require("./utils/fetch_files_engine");
const { splitUrl } = require("./utils/001");
const fs = require("fs");
const { logger } = require("./utils/logger");
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
    logger.on().print(split.last);
    if (!originalUrl.includes("index")) {
        let valid_files = filesList.valid_asset_Files[split.ext];
        if (valid_files) {
            res.type(split.ext);
            for (let k of valid_files) {
                if (k.endsWith(originalUrl)) {
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
