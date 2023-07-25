const router = require("../router.import");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
const {
    auth_,
    auth_signup,
    auth_signin,
} = require("./authentication/sign_up_auth");
const CRUD_User = require("../DB/CRUD_APIs/user.cruds");

router.use(cors(), express.json(), express.urlencoded({ extended: true }));

const helloworld = {
    hello: "hello world",
};
const success = (data_) => ({
    success: true,
    data: data_ || "no data",
});
const failure = (data_) => ({
    success: false,
    data: data_ || "no data",
});
const POST = (method = "m") => method.toLowerCase() == "post";
const GET = (method = "m") => method.toLowerCase() == "get";

router.use("*", multer().any(), (req, res, callNext) => {
    const { originalUrl, method, body, file, files } = req;
    if (!originalUrl.startsWith("/api")) return callNext();
    const s = (method + " " + originalUrl).toLowerCase();
    // console.log(s);
    const data_ =
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
        if (data_ == "no data") {
            res.status(400).send({ success: false, error: data_ });
            return;
        }
    }

    switch (s) {
        case "post /api/auth/recaptcha":
            if (false && data_?.ReCAPTCHA_sitekey == "get") {
                res.status(201).send({
                    ReCATPCHA_sitekey: process.env.RECATPCHA_SITEKEY,
                });
                return;
            }
            break;
        case "get /api/auth":
            res.status(201).send(helloworld);
            return;
        case "post /api/auth":
            const { data, action } = data_;
            console.log(data_);
            try {
                switch (action) {
                    case "sign_up":
                        if (auth_signup(data)) {
                            const v = CRUD_User.create(data);
                            console.log(v);
                            return v.then((val) => {
                                if (val?.success) {
                                    return res.status(201).send(success(data));
                                } else {
                                    return res
                                        .status(401)
                                        .send(failure({ error: val.error }));
                                }
                            });

                            throw Error(v?.error);
                        }
                    case "sign_in":
                        if (auth_signin(data)) {
                            res.status(201).send(success(data));
                            return;
                        }
                    default:
                }
            } catch (err) {
                console.log(err.message);
                return res.status(401).send(failure({ error: err.message }));
            }
            res.status(400).send(failure(data_));
            return;
    }
    console.log(body);
    res.status(400).send({
        error: "invalid route",
    });
});

module.exports = router;
