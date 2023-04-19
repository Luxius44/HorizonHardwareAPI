'use strict'
import { PrismaClient } from '@prisma/client'

import Deal from '../model/deal.mjs'

let prisma = new PrismaClient()

export const dealDao = {
    findAll : async () => {
        try {
            const deals = (await prisma.deal.findMany()).map(obj =>{
                const str = obj.detail;
                const pairs = str.split(';');
                const objDetail = {};

                pairs.forEach(pair => {
                const [key, value] = pair.split(':');
                objDetail[key] = value;
                });
                obj.detail=objDetail
                return new Deal(obj)
                })
            return deals
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findById : async (id) => {
        try {
            const elt = await prisma.deal.findUnique({where: {id: id}})
            if ( elt ==null) {
                return null 
            }
            const str = elt.detail;
            const pairs = str.split(';');
            const objDetail = {};

            pairs.forEach(pair => {
            const [key, value] = pair.split(':');
            objDetail[key] = value;
            });
            elt.detail=objDetail
            return new Deal(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    findByCatId : async (id) => {
        try {
            const deals = (await prisma.deal.findMany({where: {catId: id}})).map(obj =>{
                const str = obj.detail;
                const pairs = str.split(';');
                const objDetail = {};

                pairs.forEach(pair => {
                const [key, value] = pair.split(':');
                objDetail[key] = value;
                });
                obj.detail=objDetail
                return new Deal(obj)
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
