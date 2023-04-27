'use strict'

import { PrismaClient } from '@prisma/client'

import Tag from '../model/tag.mjs'

let prisma = new PrismaClient()

export const tagDao = {
    findAll : async () => {
        try {
            const tags = (await prisma.tag.findMany()).map(obj => new Tag(obj))
            return tags
        } catch (e) {
            return Promise.reject(e)
        }
    },
    delete: async (name) => {
        try {
            const elt = await prisma.tag.delete({where: {nom: name}})
            return new Tag(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    add: async (tag) => {
        try {
            const elt = await prisma.tag.create({data: tag})
            return new Tag(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },
}
