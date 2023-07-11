const router  = require("./router.import")

router.use("*",(req,res,callNext)=>{
    const {method, originalUrl, ip} = req

    res.on("finish",(e)=>{
        console.log(`${res.statusCode} ${method} ${originalUrl} ${ip}`)
    })
    callNext()
})

router.get("/",require("./file_handling"))
router.use("/api",require("./api"))

module.exports = router