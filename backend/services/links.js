const { default: axios } = require("axios")
const CustomError = require("../helper/errorMessage.js")
const Links = require("../models/links.js")

class LinksService {
    async getLinks(user) {
        try {
            const findUser = await Links.findOne({ where: { user: user } })
            if (!findUser) throw new CustomError("User not Found!", 404)
            return findUser
        } catch (err) {
            throw err
        }
    }

    async getUser() {
        try {
            const findUser = await Links.findAll()
            return findUser
        } catch (err) {
            throw err
        }
    }

    async verify(user) {
        try {
            const links = await this.getLinks(user)
            const linksStatus = await Promise.all(
                links.map(async (a) => {
                    try {
                        const linksRequest = await axios.get(a)
                        return { link: a, status: linksRequest.status }
                    } catch (err) {
                        if (err.code == "ERR_FR_TOO_MANY_REDIRECTS") return { link: a, status: 301 }
                    }
                })
            )
            return linksStatus
        } catch (err) {
            throw err
        }
    }

    async create(user, linksParam) {
        try {
            const findUser = await Links.findOne({ where: { user: user } })
            if (findUser) throw new CustomError("User already exists!", 402)
            const links = await Links.create({ user: user, link: linksParam })
            return links
        } catch (err) {
            throw err
        }
    }

    async update(user, linksParam) {
        const links = await this.getLinks(user)
        const findUser = await Links.findOne({ where: { user: user } })
        try {
            links.link.push(linksParam)
            findUser.link = links.link
            await findUser.save()
        } catch (err) {
            throw err
        }
    }

    async delete(user, id) {
        const links = await this.getLinks(user)
        const findUser = await Links.findOne({ where: { user: user } })
        links.link.splice(id, 1)
        try {
            findUser.link = links.link
            findUser.save()
        } catch (err) {
            throw err
        }
    }
}

module.exports = LinksService
