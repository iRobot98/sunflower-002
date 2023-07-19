require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const { logger } = require("./src/utils/logger");
const { connectToDatabase } = require("./src/DB/connectToDB");

const port = process.env.PORT || 5050;

app.use(express.json(), cors());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("*", require("./src"));

app.use("/auth", require("./src/auth"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use(express.static("views"));

app.get(
    "*",
    (req, res, callNext) => {
        const { originalUrl } = req;

        callNext();
    },
    (req, res) => res.redirect("/404")
);
app.listen(
    port,
    connectToDatabase().then(() =>
        logger.on().print(`App listening on port ${port}`)
    )
);
