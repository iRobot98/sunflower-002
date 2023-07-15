const { removeDuplicates, splitUrl, wait, wait_loop } = require("./001");
const fs = require("fs");
const { logger } = require("./logger");

const sendFile = async (file_path) => {
    try {
        if (!fs.existsSync(file_path)) {
            logger.print("file: " + file_path + " doesn't exist");
            return new Error("file doesn't exist");
        } else {
            return fs.readFileSync(file_path);
        }
    } catch (err) {
        logger.print(err.message);
        return err;
    }
};

const searchFile = (dir_, file) => {
    let file_path = dir_ + "/" + file;
    if (fs.existsSync(file_path)) {
        return fs.readFileSync(file_path);
    }
    return "not found";
};
module.exports = {
    removeDuplicates,
    splitUrl,
    wait,
    wait_loop,
    sendFile,
    searchFile,
};
