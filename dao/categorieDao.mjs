'use strict'
import { PrismaClient } from '@prisma/client'

import Categorie from '../model/categorie.mjs'

let prisma = new PrismaClient()

export const categorieDao = {
    findAll : async () => {
        try {
            const categories = (await prisma.categorie.findMany()).map(obj => new Categorie(obj))
            return categories
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findById : async (id) => {
        try {
            const elt = await prisma.categorie.findUnique({where: {id: id}})
            return elt == null ? null : new Categorie(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    delete: async (id) => {
        try {
            const elt = await prisma.categorie.delete({where: {id: id}})
            return new Categorie(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    add: async (categorie) => {
        try {
            const elt = await prisma.categorie.create({data: categorie})
            return new Categorie(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },
    update: async (id, categorie) => {
        try {
            const elt = await prisma.categorie.update({
                where: {
                    id: id
                },
                data: categorie
            })
            return new Categorie(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
