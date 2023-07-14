const router = require("../router.import");

const helloworld = {
    hello: "hello world",
};
const POST = (method = "m") => method.toLowerCase() == "post";
const GET = (method = "m") => method.toLowerCase() == "get";
router.use("*", (req, res, callNext) => {
    const { originalUrl, method, body } = req;
    if (!originalUrl.startsWith("/api")) return callNext();
    const s = (method + " " + originalUrl).toLowerCase();
    // console.log(s);
    switch (s) {
        case "get /api/auth":
            res.status(201).send(helloworld);
            return;
    }
    console.log(body);
    res.status(400).send({
        error: "invalid route",
    });
});
module.exports = router;
