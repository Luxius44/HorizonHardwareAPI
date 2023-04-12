'use strict'

import {adminDao} from "../dao/adminDao.mjs";

import Admin from '../model/admin.mjs'


import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


const PRIVATE_KEY = "XxXMinecraftXxXBlackGaming"

const verifyToken = (token) => {
    if (!token) {
      return {message: "A token is required for authentification"};
    }

    try {
      return jwt.verify(token, PRIVATE_KEY);
    } catch (err) {
      return {message: "Invalid token"};
    }
};

export const adminController = {
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
    update: async (login, admin) => {
        try {
            admin.password= bcrypt.hashSync(admin.password,8)
            return await adminDao.update(login, admin)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },
    add:async (admin) => {
        try {
            return  await adminDao.add(new Admin({
                login : admin.login,
                password : bcrypt.hashSync(admin.password,8),
                token : ""
            }))
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    login : async (admin) => {
        try {
            const adminFound = await adminDao.findByLogin(admin.login)
            if (adminFound==null || !bcrypt.compareSync(admin.password, adminFound.password)) {
                return {message: "not found"}
            }

            // on crée un token permettant à l'utilisateur de rejouer ce token quand il veut réaliser une action en lien avec son compte
            const token = jwt.sign(
                { login: admin.login },
                PRIVATE_KEY,
                {
                    expiresIn: "1h",
                }
            );
            adminFound.token = token
            const adminUpdated = await adminDao.update(adminFound.login,adminFound)
            return {token: adminUpdated.token}
        } catch (e) {
            return Promise.reject({message : "error"})
        }
    }
}
