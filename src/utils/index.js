const { removeDuplicates, splitUrl, wait, wait_loop } = require("./001");
const fs = require("fs");
const sendFile = (file_path) => {
    try {
        if (!fs.existsSync(file_path)) {
            return "file: " + file_path + " doesn't exist";
        }
        return fs.readFileSync(file_path);
    } catch (err) {
        return err.message;
    }
};
module.exports = {
    removeDuplicates,
    splitUrl,
    wait,
    wait_loop,
    sendFile,
};
