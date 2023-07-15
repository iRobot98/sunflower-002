const router = require("./router.import");
const { splitUrl, sendFile, searchFile } = require("./utils");
const { logger } = require("./utils/logger");

router.get("*", (req, res, callNext) => {
    // console.log("new");
    const { originalUrl, method } = req;

    logger.print(originalUrl);
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

module.exports = router;
