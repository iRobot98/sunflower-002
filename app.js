require("dotenv/config");
const express = require("express");

const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const { logger } = require("./src/utils/logger");
const { connectToDatabase } = require("./src/DB/connectToDB");
const { sendFile } = require("./src/utils");
const port = process.env.PORT || 5050;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("*", require("./src"));

app.get("*", express.static("./views/auth/build"), (req, res, callNext) => {
    const { originalUrl, method } = req;

    console.log(originalUrl);
    switch (originalUrl.toLowerCase()) {
        case "/auth/sign_in":
        case "/auth/sign_up":
        case "/auth/404":
            res.contentType("html");
            sendFile("./views/auth/build/index.html", res);
            return;
        case "/sign_in":
            res.redirect("/auth/sign_in");
            return;

        case "/sign_up":
            res.redirect("/auth/sign_up");
            return;
    }
    callNext();
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
