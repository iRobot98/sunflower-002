require("dotenv/config");
const express = require("express");

const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const { logger } = require("./src/utils/logger");
const { connectToDatabase } = require("./src/DB/connectToDB");
const { sendFile, splitUrl, searchFile } = require("./src/utils");
const port = process.env.PORT || 5050;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("*", require("./src"));

app.use(express.static("auth_client"));

app.get("*", (req, res, callNext) => {
    const { originalUrl, method } = req;

    console.log(originalUrl);
    switch (originalUrl.toLowerCase()) {
        case "/auth":
        case "/auth/":
            return res.redirect("/auth/sign_in");

        case "/auth/404":
        case "/auth/sign_up":
        case "/auth/sign_in":
            // res.contentType("html");
            sendFile("./views/auth/build/index.html")
                .then((f_) => res.contentType("html").send(f_))
                .catch((v) => res.status(404).redirect("/404"));
            return;
        case "/sign_in":
            res.redirect("/auth/sign_in");
            return;

        case "/sign_up":
            res.redirect("/auth/sign_up");
            return;
        default:
            if (!originalUrl.toLowerCase().startsWith("/auth"))
                return callNext();
    }

    let j = "/auth".length;
    const { split, ext } = splitUrl(originalUrl);
    if (originalUrl.startsWith("/auth")) {
        let k = originalUrl.slice(j);

        let j_ = searchFile("views/auth/build", k);
        if (j_ != "not found") {
            return res.contentType(ext).send(j_);
        }
        res.redirect("../404");
        console.log(j_);
        return;
    }
    res.status(404);
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(
    port,
    connectToDatabase().then(() =>
        logger.on().print(`App listening on port ${port}`)
    )
);
