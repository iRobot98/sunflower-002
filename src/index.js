const router = require("./router.import");
const cors = require("cors");
const multer = require("multer");
const express = require("express");

router.use("*", (req, res, callNext) => {
    const { method, originalUrl, ip } = req;

    res.on("finish", (e) => {
        console.log(`${res.statusCode} ${method} ${originalUrl} ${ip}`);
    });
    callNext();
});

router.get("/", cors(), require("./file_handling"));

router.use(
    "/api",
    express.json(),
    multer().single(),

    require("./api")
);

module.exports = router;
