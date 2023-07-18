const router = require("./router.import");
const cors = require("cors");
const multer = require("multer");
const express = require("express");
const { logger } = require("./utils/logger");

router.use("*", cors(), (req, res, callNext) => {
    const { method, originalUrl, ip } = req;

    res.on("finish", (e) => {
        logger.on().print(`${res.statusCode} ${method} ${originalUrl} ${ip}`);
    });
    callNext();
});

router.use(
    "/api",
    express.json(),
    multer().single(),

    require("./api")
);

module.exports = router;
