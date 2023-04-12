'use strict'
import { PrismaClient } from '@prisma/client'

import Admin from '../model/admin.mjs'
import bcrypt from "bcryptjs";


let prisma = new PrismaClient()

export const adminDao = {
    //tous les utilisteurs
    findAll : async () => {
        try {
            const admins = (await prisma.admin.findMany()).map(obj => new Admin(obj))
            return admins
        } catch (e) {
            return Promise.reject(e)
        }
        },


    //renvoie l'utilisateur ajouté ou une erreur sinon
    findByLogin : async (login) => {
        try {
            const elt = await prisma.admin.findUnique({where: {login: login}})
            return elt == null ? null : new Admin(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    //supprime un utilisateur
    //renvoie l'utilisateur supprimé ou erreur sinon
    deleteByLogin: async (login) => {
        try {
            const elt = await prisma.admin.delete({where: {login: login}})
            return new Admin(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },
    //ajout un utilisateur
    //renvoie l'utilisateur ajouté ou une erreur si il était déjà présent
    add: async (admin) => {
        try {
            const elt = await prisma.admin.create({data: admin})
            return new Admin(elt)
        }
        catch (e) {
            return Promise.reject(e)
        }
    },

    //Modifie un utilisateur
    //premd en paramètre le login du user à modifier et la modification
    //renvoie le user modifier ou une erreur
    update: async (login, admin) => {
        try {
            const elt = await prisma.admin.update({
                where: {
                    login: login
                },
                data: admin
            })
            return new Admin(elt)
        } catch (e) {
            return Promise.reject(e)
        }
    },
}
