const router  = require("./router.import")


router.get("/",require("./file_handling"))
router.use("/api",require("./api"))

module.exports = router