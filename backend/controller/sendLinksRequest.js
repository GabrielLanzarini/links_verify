const { Router } = require("express")
const LinksService = require("../services/links.js")

const sendLinkRequest = Router()
const service = new LinksService()

sendLinkRequest.get("/:user", async (req, res) => {
    const { user } = req.params
    try {
        const links = await service.getLinks(user)
        res.status(links.status || 200).send(links)
    } catch (err) {
        res.status(err.status || 404).json(err.message)
    }
})

sendLinkRequest.get("/verify/:user", async (req, res) => {
    const { user } = req.params
    try {
        const links = await service.verify(user)
        res.status(200).send(links)
    } catch (err) {
        res.status(err.status || 404).json(err.message)
    }
})

sendLinkRequest.post("/create/:user", async (req, res) => {
    const { user } = req.params
    const { links } = req.body
    try {
        await service.create(user, links)
        res.status(204).json({ message: "successfully added links!" })
    } catch (err) {
        res.status(err.status || 404).json(err.message)
    }
})

sendLinkRequest.put("/update/:user", async (req, res) => {
    const { user } = req.params
    const { links } = req.body
    try {
        await service.update(user, links)
        res.status(204).json({ message: "successfully added link!" })
    } catch (err) {
        res.status(err.status || 404).json(err.message)
    }
})

sendLinkRequest.delete("/delete/:user/:id", async (req, res) => {
    const { user, id } = req.params
    try {
        await service.delete(user, id)
        res.status(204).json({ message: "successfully deleted link!" })
    } catch (err) {
        res.status(err.status || 404).json(err.message)
    }
})

module.exports = sendLinkRequest
