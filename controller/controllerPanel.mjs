'use strict'

import fetch from "node-fetch";
import Fs from "fs"

import {dealDao} from "../dao/dealDao.mjs";

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
    dealsFindById : async (id) => {
      try {
          return await dealDao.findById(id)
      } catch(e) {
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
        let ext =""
        if (payload.image.headers['content-type']=='image/png') {
          ext = ".png"
        } else {
          ext = ".jpg"
        }
        const readStream = Fs.createReadStream(payload.image.path);
        const fileStream = Fs.createWriteStream("img/"+img+ext);
        await  readStream.pipe(fileStream);
        console.log(payload.image)
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
            imgId:img+ext,
            urlWeb:payload.urlweb,
        }),
         })
         response = await response.json();
         return response
      }catch (e) {
        console.log(e)
        return Promise.reject({message: "error"})
      }
    },
    updateDeal : async (payload,id,token) => {
      try {
        const deal = await dealDao.findById(id)
        let response = await fetch(process.env.URL+"/deals/"+id,{
          method : "PUT",
          headers: {
            'Accept': 'application/json',
            'token': token,
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            catId:Number(deal.catId),
            nom: payload.nom,
            prix:Number(payload.prix),
            promo:Number(payload.promo),
            date:new Date().toISOString(),
            detail:"string",
            imgId:deal.imgId,
            urlWeb:payload.urlweb,
        }),
        })
        response = await response.json();
        return response
      } catch (e) {
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
          Fs.unlink("img/"+response.imgId, (err) => {
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
        let ext =""
        if (payload.image.headers['content-type']=='image/png') {
          ext = ".png"
        } else {
          ext = ".jpg"
        }
        const fileStream = Fs.createWriteStream("img/"+img+ext);
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
            imgId:img+ext,
        }),
         })
         response = await response.json();
         return response
      }catch (e) {
        return Promise.reject({message: "error"})
      }
    },
    updateCategorie : async (payload,id,token) => {
      try {
        let response = await fetch(process.env.URL+"/categories/"+id,{
          method : "PUT",
          headers: {
            'Accept': 'application/json',
            'token': token,
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            nom: payload.nom,
            imgId:payload.imgId,
        }),
        })
        response = await response.json();
        return response
      } catch (e) {
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
          Fs.unlink("img/"+response.imgId, (err) => {
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
    addArticle : async (payload,token) => {
      try {
        const img = payload.titre+Math.floor(Math.random()*(1000))
        let ext =""
        if (payload.image.headers['content-type']=='image/png') {
          ext = ".png"
        } else {
          ext = ".jpg"
        }
        const fileStream = Fs.createWriteStream("img/"+img+ext);
        const readStream = Fs.createReadStream(payload.image.path);
        await  readStream.pipe(fileStream);
        let response=await fetch(process.env.URL+"/articles",{
          method : "POST",
          headers: {
              'Accept': 'application/json',
              'token': token,
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            titre  :payload.titre,
            description :payload.description,
            contenu :payload.contenu,
            imgId   :img+ext,
            tag :payload.tag,
            tags : payload.tags?payload.tags:"",
            date : new Date().toISOString(),
        }),
         })
         response = await response.json();
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