const fs = require("fs");
const { log_dir } = require("../../server.settings");

if (!fs.existsSync(log_dir)) fs.mkdirSync(log_dir, { recursive: true });

const logger = {
    _debug: false,
    log_file: `${log_dir}/debug_log.txt`,
    on: () => {
        logger._debug = true;
        return logger;
    },
    off: () => {
        logger._debug = false;
        return logger;
    },

    print,
};

function print(...text) {
    const t__ = new Date();
    const t_ = `${t__.toDateString()} ${t__.toLocaleTimeString()}`;
    let i_ = 0;
    for (let kv of text) {
        (async (kv, i) => {
            const s = `${t_}:  ${kv}`;
            (async () =>
                fs.writeFileSync(logger.log_file, s, {
                    encoding: "utf-8",
                    flag: "a+",
                }))();
            if (logger._debug) console.log(s);
        })(kv);
    }
    logger.off();
}

module.exports = {
    logger,
};
