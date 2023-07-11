const express = require("express")
const fs = require("fs")
const router = express.Router()


router.get("/app",
    express.static("views/app/build"),
    (req,res)=>
        res.send(
            fs.readFileSync("../views/app/build/index.html")))
router.get("/auth",express.static("views/auth/build"))


module.exports = router