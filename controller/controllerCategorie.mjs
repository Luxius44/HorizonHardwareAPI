'use strict'

import {categorieDao} from "../dao/categorieDao.mjs";

import jwt from "jsonwebtoken"

const PRIVATE_KEY = process.env.PRIVATE_KEY

const verifyToken = (token) => {
    if (!token) {
      return {message: "A token is required"};
    }
    try {
      return jwt.verify(token, PRIVATE_KEY);
    } catch (err) {
      return {message: "Invalid token"};
    }
};

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
    delete: async (id,token) =>{
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await categorieDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (categorie,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return  await categorieDao.add(categorie)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, categorie,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await categorieDao.update(id, categorie)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
