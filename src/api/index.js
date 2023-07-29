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
const { logger } = require("../utils/logger");

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
    error: data_ || "no data",
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
            break;
        case "get /api/auth":
            res.status(201).send(helloworld);
            return;
        case "post /api/auth":
            const { data, action } = data_;
            console.log(data_);
            try {
                switch (action) {
                    case "sign_up": {
                        const j = auth_signup(data);

                        if (j?.success) {
                            const v = CRUD_User.CreateUser(data);

                            return v.then((val) => {
                                console.log(val);
                                if (val?.success) {
                                    return res.status(201).send(success(val));
                                } else {
                                    return res
                                        .status(400)
                                        .send(failure({ error: val.error }));
                                }
                            });
                        } else {
                            return res.status(400).send(failure(j));
                        }
                    }

                    case "sign_in":
                        const j = auth_signin(data);
                        if (j) {
                            const login_attempt = CRUD_User.LogInUser(data);
                            return login_attempt.then((val) => {
                                if (val?.success)
                                    return res
                                        .status(201)
                                        .send(success(login_attempt));
                                return res.status(400).send(failure(val));
                            });
                        } else {
                            return res.status(400).send(failure(j));
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
