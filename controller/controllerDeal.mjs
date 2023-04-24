'use strict'

import {dealDao} from "../dao/dealDao.mjs";

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


export const dealController = {
    findAll : async () => {
        try {
            return await dealDao.findAll()
        } catch (e) {return Promise.reject({message : "error"})}
    },
    findByCatId : async (id) => {
    try {
        return await dealDao.findByCatId(id)
    } catch(e) { return Promise.reject({message: "error"})}
    },
    delete: async (id,token) =>{
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await dealDao.delete(id)
        } catch(e)
        { return Promise.reject({message: "error"})}
    },
    add:async (deal,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return  await dealDao.add(deal)
        } catch(e) {
            return Promise.reject({message: "error"})}
    },
    update: async (id, deal,token) => {
        try {
            if (!verifyToken(token).login) {
                return Promise.reject({message: "not found"})
            }
            return await dealDao.update(id, deal)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}
