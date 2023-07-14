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

app.use("/auth", express.static("./views/auth/build"), (req, res) =>
    res.send(sendFile("./views/auth/build/index.html"))
);

app.use("*", require("./src"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(
    port,
    connectToDatabase().then(() =>
        logger.on().print(`App listening on port ${port}`)
    )
);
