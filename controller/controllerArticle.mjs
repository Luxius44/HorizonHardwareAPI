'use strict'

import {articleDao} from "../dao/articleDao.mjs";

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
    delete: async (id,token) =>{
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await articleDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (article,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return  await articleDao.add(article)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, article,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await articleDao.update(id, article)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
