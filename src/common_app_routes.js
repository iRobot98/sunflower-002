const express = require("express");
const fs = require("fs");
const path = require("path");
const { logger } = require("./utils/logger");
const router = express.Router();

logger.on();
{
    const auth_index = "views/auth/build/index.html";
    const auth_assets = "views/auth/build/static";
    logger.print(`${auth_index} exists: ${fs.existsSync(auth_index)}`);
    logger.print(`${auth_assets} exists: ${fs.existsSync(auth_assets)}`);

    router.get("/static", express.static("views/auth/build/static"));

    router.get("/authenticate", (req, res, callNext) => {
        const { originalUrl } = req;
        const login = () => res.redirect("/authenticate/log_in");
        const send_auth_page = () =>
            res.contentType("html").send(fs.readFileSync(auth_index));
        return send_auth_page();
        console.log("hitting foo");
        switch (originalUrl) {
            case "/authenticate":
                return login();
            case "/authenticate/log_in":
                return send_auth_page();
            case "/authenticate/sign_up":
                return send_auth_page();
            case "/authenticate/404":
                return send_auth_page();
            default:
                if (originalUrl.startsWith("/auth")) return login();
        }

        callNext();
    });
}

{
    const global_css = "views/assets/css/globals.css";
    logger.print(`${global_css} exists: ` + fs.existsSync(global_css));

    router.get("/global_assets", express.static("views/assets/"));

    router.get("/global_assets/index.css", (req, res) =>
        res.contentType("css").send(fs.readFileSync(global_css))
    );
}

{
    const app_index = "views/app/build/index.html";
    logger.print(`${app_index} exists: ` + fs.existsSync(app_index));

    router.get("/static", express.static("views/app/build"));
    router.get("/app", (req, res) =>
        res.contentType("html").send(fs.readFileSync(app_index))
    );
}

logger.off();
module.exports = router;
