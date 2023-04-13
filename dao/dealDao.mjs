'use strict'
import { PrismaClient } from '@prisma/client'

import Deal from '../model/deal.mjs'

let prisma = new PrismaClient()

export const dealDao = {
    findAll : async () => {
        try {
            const deals = (await prisma.deal.findMany()).map(obj => new Deal(obj))
            return deals
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findById : async (id) => {
        try {
            const elt = await prisma.deal.findUnique({where: {id: id}})
            return elt == null ? null : new Deal(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findByCatId : async (id) => {
        try {
            const deals = (await prisma.deal.findMany({where: {catId: id}})).map(obj => {
                obj.detail=obj.detail.split('/')
                new Deal(obj)
            })
            return deals
        } catch (e) {
            return Promise.reject(e)
        }
    },
    delete: async (id) => {
        try {
            const elt = await prisma.deal.delete({where: {id: id}})
            return new Deal(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    add: async (deal) => {
        try {
            const elt = await prisma.deal.create({data: deal})
            return new Deal(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },
    update: async (id, deal) => {
        try {
            const elt = await prisma.deal.update({
                where: {
                    id: id
                },
                data: deal
            })
            return new Deal(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
