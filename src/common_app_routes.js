const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

{
    const app_index = "views/app/build/index.html";
    console.log(`${app_index} exists:`, fs.existsSync(app_index));

    router.get("/app", express.static("views/app/build"));
    router.get("/app", (req, res) =>
        res.contentType("html").send(fs.readFileSync(app_index))
    );
}
{
    const auth_index = "views/auth/build/index.html";
    console.log(`${auth_index} exists:`, fs.existsSync(auth_index));

    router.get("/auth", express.static("views/auth/build"));

    router.get("/auth", (req, res) =>
        res.contentType("html").send(fs.readFileSync(auth_index))
    );
}

{
    const global_css = "views/assets/css/globals.css";
    console.log(`${global_css} exists:`, fs.existsSync(global_css));

    router.get("/global_assets", express.static("views/assets/"));

    router.get("/global_assets/index.css", (req, res) =>
        res.contentType("css").send(fs.readFileSync(global_css))
    );
}
module.exports = router;
