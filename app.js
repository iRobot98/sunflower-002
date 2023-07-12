require("dotenv/config");
const express = require("express");
const fs = require("fs");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const { logger } = require("./src/utils/logger");
const port = process.env.PORT || 5050;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("/", require("./src"));
app.use("/", require("./src/common_app_routes"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
    logger.on().print(`App listening on port ${port}`);
});
