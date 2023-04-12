'use strict'

import {categorieDao} from "../dao/categorieDao.mjs";

export const categorieController = {
    findAll : async () => {
        try {
            return await categorieDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findByName : async (name) => {
    try {
        return await categorieDao.findByName(name)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    delete: async (login) =>{
        try {
            return await categorieDao.delete(login)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (categorie) => {
        try {
            return  await categorieDao.add(categorie)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (name, categorie) => {
        try {
            return await categorieDao.update(name, categorie)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
