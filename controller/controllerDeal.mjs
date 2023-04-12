'use strict'

import {dealDao} from "../dao/dealDao.mjs";

export const dealController = {
    findAll : async () => {
        try {
            return await dealDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findByCatId : async (name) => {
    try {
        return await dealDao.findByCatId(name)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    findById : async (id) => {
        try {
            return await dealDao.findById(id)
        } catch(e) { return Promise.reject({message: "error"})}
    },
    delete: async (id) =>{
        try {
            return await dealDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (deal) => {
        try {
            return  await dealDao.add(deal)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, deal) => {
        try {
            return await dealDao.update(id, deal)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
