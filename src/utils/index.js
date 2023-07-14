const { removeDuplicates, splitUrl, wait, wait_loop } = require("./001");
const fs = require("fs");
const { logger } = require("./logger");

const sendFile = (file_path, res) => {
    try {
        if (!fs.existsSync(file_path)) {
            logger.print("file: " + file_path + " doesn't exist");
            res.redirect("/404");
        } else {
            res.send(fs.readFileSync(file_path));
        }
    } catch (err) {
        logger.print(err.message);
        res.redirect("/404");
    }
};
module.exports = {
    removeDuplicates,
    splitUrl,
    wait,
    wait_loop,
    sendFile,
};
