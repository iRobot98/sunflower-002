const express = require("express");
const fs = require("fs");
const path = require("path");
const { logger } = require("./utils/logger");
const exp = require("constants");
const router = express.Router();

logger.on();

{
    const auth_ = "views/auth/build";
    logger.print(`${auth_} exists:\t${fs.existsSync(auth_)}`);
    const auth_index = `${auth_}/index.html`;
    logger.print(`${auth_index} exists:\t${fs.existsSync(auth_index)}`);

    router.get("/authenticate", express.static(auth_));
    router.get("/authenticate", (req, res) =>
        res.contentType("html").send(fs.readFileSync(auth_index))
    );
}

logger.off();
module.exports = router;
