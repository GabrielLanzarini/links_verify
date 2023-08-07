const { default: axios } = require("axios")
const CustomError = require("../helper/errorMessage.js")
const Links = require("../models/links.js")

class LinksService {
    async getLinks(user) {
        try {
            const findUser = await Links.findOne({ where: { user: user } })
            if (!findUser) throw new CustomError("User not Found!", 404)
            // if (findUser.link.length == 1) return findUser.link
            // const arrayFilter = findUser.link
            //     .slice(1, -1)
            //     .split(",")
            //     .map((item) => item.replace(/"/g, ""))
            return findUser.link
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
                    } catch (error) {
                        return { link: a, status: error.response ? error.response.status : "Error" }
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
            links.push(linksParam)
            findUser.link = links
            await findUser.save()
        } catch (err) {
            throw err
        }
    }

    async delete(user, id) {
        const links = await this.getLinks(user)
        const findUser = await Links.findOne({ where: { user: user } })
        console.log(links)
        links.splice(id, 1)
        try {
            findUser.link = links
            findUser.save()
        } catch (err) {
            throw err
        }
    }
}

module.exports = LinksService
