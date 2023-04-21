'use strict'

import fetch from "node-fetch";
import Fs from "fs"

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
            let response=await fetch(process.env.URL+"/admins/login",{
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
        let response = await fetch (process.env.URL+"/articles")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    categories : async() => {
      try {
        let response = await fetch (process.env.URL+"/categories")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    deals : async() => {
      try {
        let response = await fetch (process.env.URL+"/deals")
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },

    dealsByCatId : async(id) => {
      try {
        let response = await fetch(process.env.URL+"/deals/"+id)
        response = await response.json();
        return response
      } catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    addDeal : async (payload,token) => {
      try {
        const img = payload.nom+Math.floor(Math.random()*(1000))
        const fileStream = Fs.createWriteStream("img/"+img+".jpg");
        const readStream = Fs.createReadStream(payload.image.path);
        await  readStream.pipe(fileStream);
        let response=await fetch(process.env.URL+"/deals",{
          method : "POST",
          headers: {
              'Accept': 'application/json',
              'token': token,
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            catId:Number(payload.catId.split(':')[0]),
            nom:payload.nom,
            prix:Number(payload.prix),
            promo:Number(payload.promo),
            date:new Date().toISOString(),
            detail:"string",
            imgId:img,
            urlWeb:payload.urlweb,
        }),
         })
         response = await response.json();
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    deleteDeal : async (id,token) => {
      try {
        let response=await fetch(process.env.URL+"/deals/"+id,{
          method : "DELETE",
          headers: {
              'Accept': 'application/json',
              'token': token,
          },
         })
         response = await response.json();
         if (response.imgId) {
          Fs.unlink("img/"+response.imgId+".jpg", (err) => {
            if (err) {
              return;
            }
          })
         }
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    addCategorie : async (payload,token) => {
      try {
        const img = payload.nom+Math.floor(Math.random()*(1000))
        const fileStream = Fs.createWriteStream("img/"+img+".jpg");
        const readStream = Fs.createReadStream(payload.image.path);
        await  readStream.pipe(fileStream);
        let response=await fetch(process.env.URL+"/categories",{
          method : "POST",
          headers: {
              'Accept': 'application/json',
              'token': token,
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            nom:payload.nom,
            imgId:img,
        }),
         })
         response = await response.json();
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    deleteCategories : async (id,token) => {
      try {
        let response=await fetch(process.env.URL+"/categories/"+id,{
          method : "DELETE",
          headers: {
              'Accept': 'application/json',
              'token': token,
          },
         })
         response = await response.json();
         if (response.imgId) {
          Fs.unlink("img/"+response.imgId+".jpg", (err) => {
            if (err) {
              return;
            }
          })
         }
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    deleteArticles : async (id,token) => {
      try {
        let response=await fetch(process.env.URL+"/articles/"+id,{
          method : "DELETE",
          headers: {
              'Accept': 'application/json',
              'token': token,
          },
         })
         response = await response.json();
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
}