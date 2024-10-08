'use strict'
import { PrismaClient } from '@prisma/client'

import Article from '../model/article.mjs'

let prisma = new PrismaClient()

export const articleDao = {
    findAll : async () => {
        try {
            const articles = (await prisma.article.findMany()).map(obj => {
                return new Article(obj)
            })
            return articles
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findById : async (id) => {
        try {
            const elt = await prisma.article.findUnique({where: {id: id}})
            if (elt!=null) {
                if (elt.tags.length>0) {
                    elt.tags=elt.tags.split(':')
                } else {
                    elt.tags = []
                }
            } else {
                return null
            }
            return new Article(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    delete: async (id) => {
        try {
            const elt = await prisma.article.delete({where: {id: id}})
            return new Article(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    add: async (article) => {
        try {
            const elt = await prisma.article.create({data: article})
            return new Article(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },
    update: async (id, article) => {
        try {
            const elt = await prisma.article.update({
                where: {
                    id: id
                },
                data: article
            })
            return new Article(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
