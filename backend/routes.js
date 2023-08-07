const { Router } = require("express")
const sendLinkRequest = require("./controller/sendLinksRequest")
const router = Router()

router.use("/links", sendLinkRequest)

module.exports = router
