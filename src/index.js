const router = require("./router.import");
const cors = require("cors");
const multer = require("multer");
const express = require("express");
const { logger } = require("./utils/logger");
const { splitUrl } = require("./utils");
const { invalid_exts } = require("../server.settings");
const { valid_exts, valid_assets } = require("./utils/fetchfiles");
const fs = require("fs");
const { CheckRequest } = require("./DB/CRUD_APIs/jwt_cruds");

router.use("*", cors(), (req, res, callNext) => {
    const { method, originalUrl, ip } = req;

    res.on("finish", (e) => {
        logger.on().print(`${res.statusCode} ${method} ${originalUrl} ${ip}`);
    });
    callNext();
});

router.use(
    "/api",
    (req, res, callNext) => {
        CheckRequest(req).then((v) => console.log(v));
        callNext();
    },
    require("./api")
);

let library = {};
router.get("*", (req, res, callNext) => {
    const { originalUrl } = req;
    const { ext, last } = splitUrl(originalUrl);
    if (!valid_exts.includes(ext)) {
        return callNext();
    }
    const sendFile = (path_ = "") => {
        res.contentType(ext).send(fs.readFileSync(path_));
    };
    if (library[originalUrl]) {
        return sendFile(library[originalUrl]);
    }
    let j = valid_assets[ext].filter(
        (v) => v.endsWith(last) && !v.startsWith("_")
    );
    if (j.length) {
        const p_ = j.pop();
        library[originalUrl] = p_;
        return sendFile(p_);
    }

    callNext();
});

module.exports = router;
