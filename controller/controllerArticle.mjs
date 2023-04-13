'use strict'

import {articleDao} from "../dao/articleDao.mjs";

export const articleController = {
    findAll : async () => {
        try {
            return await articleDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findById : async (id) => {
    try {
        return await articleDao.findById(id)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    delete: async (id) =>{
        try {
            return await articleDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (article) => {
        try {
            return  await articleDao.add(article)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, article) => {
        try {
            return await articleDao.update(id, article)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
