const router  = require("./router.import")

router.get("/",require("./common_app_routes"))
router.get("/",require("./file_handling"))
router.use("/api",require("./api"))

module.exports = router