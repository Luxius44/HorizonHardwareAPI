'use strict'

import {categorieDao} from "../dao/categorieDao.mjs";

export const categorieController = {
    findAll : async () => {
        try {
            return await categorieDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findById : async (id) => {
    try {
        return await categorieDao.findById(id)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    delete: async (id) =>{
        try {
            return await categorieDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (categorie) => {
        try {
            return  await categorieDao.add(categorie)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, categorie) => {
        try {
            return await categorieDao.update(id, categorie)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
