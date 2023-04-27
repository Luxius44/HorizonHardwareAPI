'use strict'

import {tagDao} from "../dao/tagDao.mjs";

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

export const tagController = {
    findAll : async () => {
        try {
            return await tagDao.findAll()
        } catch (e) {
            return Promise.reject({message : "error"})
        }
    },
    delete: async (name,token) =>{
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await tagDao.delete(name)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (tag,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return  await tagDao.add(tag)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
}
