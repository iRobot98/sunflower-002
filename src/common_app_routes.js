const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/app", express.static("views/app/build"));
router.get("/app", (req, res) =>
    res.contentType("html").send(fs.readFileSync("views/app/build/index.html"))
);

router.get("/auth", express.static("views/auth/build"));
router.get("/auth", (req, res) =>
    res.contentType("html").send(fs.readFileSync("views/auth/build/index.html"))
);
module.exports = router;
