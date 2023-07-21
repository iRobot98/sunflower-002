const router = require("../router.import");
const multer = require("multer");
const express = require("express");
const CORS = require("cors");
const { auth_ } = require("./authentication/sign_up_auth");

const helloworld = {
    hello: "hello world",
};
const success = (data) => ({
    success: true,
    data: data || "no data",
});
const failure = (data) => ({
    success: false,
    data: data || "no data",
});
const POST = (method = "m") => method.toLowerCase() == "post";
const GET = (method = "m") => method.toLowerCase() == "get";

router.use("*", multer().any(), (req, res, callNext) => {
    const { originalUrl, method, body, file, files } = req;
    if (!originalUrl.startsWith("/api")) return callNext();
    const s = (method + " " + originalUrl).toLowerCase();
    // console.log(s);
    const data =
        body || file || files
            ? body
                ? body
                : file
                ? file
                : files
                ? files
                : "no data"
            : "no data";
    if (POST(method)) {
        if (data == "no data") {
            res.status(400).send({ success: false, error: data });
            return;
        }
    }
    switch (s) {
        case "get /api/auth":
            res.status(201).send(helloworld);
            return;
        case "post /api/auth":
            if (data?.data && auth_(data?.data)) {
                res.status(201).send(success(data.data));
            }
            res.status(400).send(failure(data));
            return;
    }
    console.log(body);
    res.status(400).send({
        error: "invalid route",
    });
});

module.exports = router;
