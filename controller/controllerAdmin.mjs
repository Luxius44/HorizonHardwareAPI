'use strict'

import {adminDao} from "../dao/adminDao.mjs";

export const adminController = {
    findAll : async () => {
        try {
            return await adminDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findByLogin : async (login) => {
    try {
        return await adminDao.findByLogin(login)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    deleteByLogin: async (login) =>{
        try {
            return await adminDao.deleteByLogin(login)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (admin) => {
        try {
            return  await adminDao.add(admin)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (login, admin) => {
        try {
            return await adminDao.update(login, admin)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
