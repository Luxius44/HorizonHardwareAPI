'use strict'

import fetch from "node-fetch";

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

export const panelController = {

    login : async(login,password) => {
        try {
            let response=await fetch("http://localhost:3000/admins/login",{
                method : "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    login: login,
                    password: password,
                  })
            })
            response = await response.json();
            return response
        } catch {
            return Promise.reject({message: "error"})
        }
    },

    articles : async() => {
      try {
        let response = await fetch ("http:localhost:3000/articles")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    categories : async() => {
      try {
        let response = await fetch ("http:localhost:3000/categories")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    deals : async() => {
      try {
        let response = await fetch ("http:localhost:3000/deals")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    dealsByCatId : async(id) => {
      try {
        let response = await fetch("http:localhost:3000/deals/"+id)
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    }
}