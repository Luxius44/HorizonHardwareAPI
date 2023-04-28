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
            if (elt!=null) {
                if (elt.detail.length>0) {
                    elt.detail=elt.detail.split(':')
                } else {
                    elt.detail = []
                }
            } else {
                return null
            }
            return new Categorie(elt)
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
