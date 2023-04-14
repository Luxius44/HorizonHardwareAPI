'use strict'

import Hapi from '@hapi/hapi'
import Joi from 'joi'

import Inert from '@hapi/inert'
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import {adminController} from "./controller/controllerAdmin.mjs";
import {categorieController} from "./controller/controllerCategorie.mjs";
import {dealController} from "./controller/controllerDeal.mjs";
import {articleController} from "./controller/controllerArticle.mjs";
import {contactController} from "./controller/controllerContact.mjs"



const joiAdmin = Joi.object({
        login: Joi.string().required().description("login must be unique"),
        password: Joi.string().required().description("must an non-empty ")
}).description('User')

const joiAdminToken = Joi.object({
    login: Joi.string().required().description("login must be unique"),
    password: Joi.string().required().description("must an non-empty "),
    token: Joi.string().required().description("Admin token")
}).description('Admin with his token')

const joiAdminsToken = Joi.array().items(joiAdminToken).description("Admins with their token")

const joiCategorie = Joi.object({
    id: Joi.number().integer().required().description("id of the categorie, autoincrement"),
    nom: Joi.string().required().description("name of the categorie"),
    imgId: Joi.string().required().description("id of the image of the categorie")
}).description('Categorie')

const joiCategories = Joi.array().items(joiCategorie).description("Collection of Categorie")

const joiCategorieAdd = Joi.object({
    nom: Joi.string().required().description("name of the categorie"),
    imgId: Joi.string().required().description("id of the image of the categorie")
})

const joiArticle = Joi.object({
    id: Joi.number().integer().required().description("id of the article, autoincrement"),
    titre: Joi.string().required().description("name of the article"),
    description: Joi.string().required().description("description of the article"),
    contenu: Joi.string().required().description("content of the article"),
    imgId: Joi.string().required().description("id of the image of the article"),
    imgsId: Joi.string().required().description("ids of the image of the article"),
    tag : Joi.string().required().description("id of the image of the article"),
    tags : Joi.string().required().description("ids of the other images of the article"),
    date : Joi.date().iso().required().description("date of the release")
}).description('Article')

const joiArticleUsable = Joi.object({
    id: Joi.number().integer().required().description("id of the article, autoincrement"),
    titre: Joi.string().required().description("name of the article"),
    description: Joi.string().required().description("description of the article"),
    contenu: Joi.string().required().description("content of the article"),
    imgId: Joi.string().required().description("id of the image of the article"),
    imgsId: Joi.array().items(Joi.string()).required().description("ids of the image of the article"),
    tag : Joi.string().required().description("principal tag the article"),
    tags : Joi.array().items(Joi.string()).required().description("tags of the article"),
    date : Joi.date().iso().required().description("date of the release")
}).description('Article')

const joiArticles = Joi.array().items(joiArticle).description("Collection of Article")

const joiArticleAdd = Joi.object({
    titre: Joi.string().required().description("name of the article"),
    description: Joi.string().required().description("description of the article"),
    contenu: Joi.string().required().description("content of the article"),
    imgId: Joi.string().required().description("id of the image of the article"),
    imgsId: Joi.string().required().description("ids of the image of the article"),
    tag : Joi.string().required().description("id of the image of the article"),
    tags : Joi.string().required().description("ids of the other images of the article"),
    date : Joi.date().iso().required().description("date of the release")
})

const joiDeal = Joi.object({
    id: Joi.number().integer().required().description("id of the deal, autoincrement"),
    catId : Joi.number().integer().required().description("id of the categorie"),
    nom: Joi.string().required().description("name of the deal"),
    prix: Joi.number().required().description("price of the deal"),
    promo: Joi.number().required().description("promo price of the deal"),
    date : Joi.date().iso().required().description("release date of the deal"),
    detail : Joi.string().required().description("unique information link to this deal"),
    imgId: Joi.string().required().description("id of the image of the categorie"),
    urlWeb: Joi.string().required().description("url of the product")
})

const joiDeals = Joi.array().items(joiDeal).description("Collection of Deal")

const joiDealAdd = Joi.object({
    catId : Joi.number().integer().required().description("id of the categorie"),
    nom: Joi.string().required().description("name of the deal"),
    prix: Joi.number().required().description("price of the deal"),
    promo: Joi.number().required().description("promo price of the deal"),
    date : Joi.date().required().description("release date of the deal"),
    detail : Joi.string().required().description("unique information link to this deal"),
    imgId: Joi.string().required().description("id of the image of the categorie"),
    urlWeb: Joi.string().required().description("url of the product")
})

const joiId = Joi.object({id : Joi.number().integer().required().description("id of the object")})

const joiToken = Joi.object({
    token: Joi.string().required().description("valid token")
})

const tokenNotFound = Joi.object({
    message: "token not found"
})

const notFound = Joi.object({
    message: "not found"
})

const errorMessage = Joi.object({
    message: "error"
})

const swaggerOptions = {
    info: {
        title: "L'API DES DEALS HARDWARE HORIZON",
        version: '1.0.0',
    }
};

const routes =[
    // Any :
    {
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return h.response({message:"not found"}).code(404)
        }
    },
    // Admin :
    {
        method: 'GET',
        path: '/admin',
        options: {
            description: 'Get All Admins',
            notes: 'Returns all Admins or an error message',
            tags: ['api'],
            validate: {
               headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiAdminsToken,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        
        handler: async (request, h) => {
            try {
                const admins = await adminController.findAll(request.headers.token)
                return h.response(admins).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message:"error"}).code(400)
            }
        }
    },
    {
        method: 'PUT',
        path: '/admin/login',
        options : {
            description : 'login to an account and send back a token',
            notes : 'login to an existent account',
            tags : ['api'],
            validate: {
                payload: joiAdmin
            },
            response: {
                status : {
                    200 : joiToken,
                    400 : errorMessage,
                    404 : notFound
                }
            }
        },
        handler: async (request, h) => {
            try {
                const admin = request.payload
                const token = await adminController.login(admin)
                
                if (token != null && !token.message) {
                    return h.response(token).code(201)
                } else if(token.message == "not found") {
                    return h.response(token).code(404)
                } else {
                    return h.response(token).code(400)
                }
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method: 'POST',
        path: '/admin/add',
        options: {
            description: 'Add Admin',
            notes: 'Returns added Admin',
            tags: ['api'],
            validate: {
                headers: joiToken.options({ allowUnknown: true }),
                payload: joiAdmin
            },
            response: {
                status : {
                    200 : joiAdminToken,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request, h) => {
            try {
                const adminToAdd = request.payload
                const token = request.headers.token
                const admin = await adminController.add(adminToAdd,token)
                return h.response(admin).code(201)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message:"error"}).code(400)
            }
        }
    },
    {
        method: 'DELETE',
        path: '/admin/delete/{login}',
        options: {
            description: 'Delete Admin',
            notes: 'Returns the deleted admin or un an error message',
            tags: ['api'],
            validate: {
                params: Joi.object({login : Joi.string().required().description('the login for the Admin'),}),
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiAdminToken,
                    400 : errorMessage,
                    404 : tokenNotFound,
                    405 : notFound
                }
            }
        },
        handler: async (request, h) => {
            try {
                const admin = await adminController.deleteByLogin(request.params.login,request.headers.token)
                return h.response(admin).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'not found'}).code(405)
            }
        }
        },
    {
        method: 'PUT',
        path: '/admin/update/{login}',
        options: {
            description: 'Update Admin',
            notes: 'Returns a admin or un an error message',
            tags: ['api'],
            validate: {
                params: Joi.object({login : Joi.string().required().description('the login for the admin'),}),
                headers: joiToken.options({ allowUnknown: true }),
                payload: joiAdmin
            },
            response: {
                status : {
                    201 : joiAdminToken,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request, h) => {
            try {
                const admin = await adminController.update(request.params.login, request.payload,request.headers.token)
                return h.response(admin).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Deals :
    {
        method : 'GET',
        path: '/deals',
        options: {
            description: 'Get all the Deals',
            notes: 'Returns array of Deals',
            tags: ['api'],
            response: {
                status : {
                    201 : joiDeals,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deals = await dealController.findAll()
                return h.response(deals).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'GET',
        path: '/deals/{categorieId}',
        options: {
            description: 'Get the deals associate to the categorieId',
            notes: 'Returns a Deals',
            tags: ['api'],
            validate: {
                params : Joi.object({categorieId:Joi.number().required().description("id of the categorie")}) 
            },
            response: {
                status : {
                    201 : joiDeals,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deals = await dealController.findByCatId(request.params.categorieId)
                return h.response(deals).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'POST',
        path: '/deals',
        options: {
            description: 'Add Deal',
            notes: 'Returns the added Deal',
            tags: ['api'],
            validate : {
                payload : joiDealAdd,
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiDeal,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deal = await dealController.add(request.payload,request.headers.token)
                return h.response(deal).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'PUT',
        path: '/deals/{id}',
        options: {
            description: 'Update Deal',
            notes: 'Returns the updated Deal',
            tags: ['api'],
            validate : {
                params: Joi.object({
                    id : Joi.number().required().description("id of the Deal")
                }),
                headers: joiToken.options({ allowUnknown: true }),
                payload : joiDealAdd
            },
            response: {
                status : {
                    201 : joiDeal,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deal = await dealController.update(request.params.id,request.payload,request.headers.token)
                return h.response(deal).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'DELETE',
        path: '/deals/{id}',
        options: {
            description: 'Delete the Deal',
            notes: 'Returns the deleted Deal',
            tags: ['api'],
            validate : {
                params : joiId,
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiDeals,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deal = await dealController.delete(request.params.id,request.headers.token)
                return h.response(deal).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Categorie :
    {
        method : 'GET',
        path: '/categories',
        options: {
            description: 'Get all Categories',
            notes: 'Returns array of Categories',
            tags: ['api'],
            response: {
                status : {
                    201 : joiCategories,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categories = await categorieController.findAll()
                return h.response(categories).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'GET',
        path: '/categories/{id}',
        options: {
            description: 'Get a Categorie by is id',
            notes: 'Returns a Categorie',
            tags: ['api'],
            validate: {
                params : joiId
            },
            response: {
                status : {
                    201 : joiCategorie,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.findById(request.params.id)
                return h.response(categorie).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'POST',
        path: '/categories',
        options: {
            description: 'Add Categorie',
            notes: 'Returns the added Categorie',
            tags: ['api'],
            validate : {
                payload : joiCategorieAdd,
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiCategorie,
                    400 : errorMessage,
                    404 : tokenNotFound
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.add(request.payload,request.headers.token)
                return h.response(categorie).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'PUT',
        path: '/categories/{id}',
        options: {
            description: 'Update Categorie',
            notes: 'Returns the updated Categorie',
            tags: ['api'],
            validate : {
                params: joiId ,
                payload : joiCategorieAdd,
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiCategorie,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.update(request.params.id,request.payload,request.headers.token)
                return h.response(categorie).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'DELETE',
        path: '/categories/{id}',
        options: {
            description: 'Delete Categorie',
            notes: 'Returns the deleted Categorie',
            tags: ['api'],
            validate : {
                params : joiId,
                headers: joiToken.options({ allowUnknown: true }),
            },
            response: {
                status : {
                    201 : joiCategorie,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.delete(request.params.id,request.headers.token)
                return h.response(categorie).code(200)
            } catch (e) {
                if (e.message=='not found') {
                    return h.response({message:"token not found"}).code(404)
                }
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Article :
    {
        method : 'GET',
        path: '/articles',
        options: {
            description: 'Get all Articles',
            notes: 'Returns array of Article',
            tags: ['api'],
            response: {
                status : {
                    201 : joiArticles,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const articles = await articleController.findAll()
                return h.response(articles).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'GET',
        path: '/articles/{id}',
        options: {
            description: 'Get a Usable Article by is id',
            notes: 'Returns a Usable Article',
            tags: ['api'],
            validate: {
                params : joiId
            },
            response: {
                status : {
                    201 : joiArticleUsable,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const article = await articleController.findById(request.params.id)
                return h.response(article).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'POST',
        path: '/articles',
        options: {
            description: 'Add Article',
            notes: 'Returns the added Article',
            tags: ['api'],
            validate : {
                payload : joiArticleAdd
            },
            response: {
                status : {
                    201 : joiArticle,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const article = await articleController.add(request.payload)
                return h.response(article).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'PUT',
        path: '/articles/{id}',
        options: {
            description: 'Update Article',
            notes: 'Returns the updated Article',
            tags: ['api'],
            validate : {
                params: joiId ,
                payload : joiArticleAdd
            },
            response: {
                status : {
                    201 : joiArticle,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const article = await articleController.update(request.params.id,request.payload)
                return h.response(article).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'DELETE',
        path: '/articles/{id}',
        options: {
            description: 'Delete Article',
            notes: 'Returns the deleted Article',
            tags: ['api'],
            validate : {
                params : joiId
            },
            response: {
                status : {
                    201 : joiArticle,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const article = await articleController.delete(request.params.id)
                return h.response(article).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Image :
    {
        method : 'GET',
        path: '/img/{filename}',
        options: {
            description: 'Get an Image by is id',
            notes: 'Returns an Image or an error if the id doesnt exist',
            tags: ['api'],
            validate: {
                params : Joi.object({filename:Joi.string().required().description("filename without the extension")})
            },
        },
        handler: (request,h) => {
            try {
                const filename = request.params.filename
                return h.file(`img/${filename}.jpg`)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Contact :
    {
        method : 'PUT',
        path : '/contact',
        options: {
            description: 'Send email to HardwareHorizon',
            notes : 'Returns true or false',
            tags : ['api'],
            validate: {
                payload : Joi.object({
                    from : Joi.string().required().description('sender email'),
                    subject : Joi.string().required().description('mail subject'),
                    text : Joi.string().required().description("mail content")
                })
            }
        },
        handler: (request,h) => {
            try {
                return h.response(contactController.sendMail(request.payload)).code(201)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    }
]


// Configuration Hapi :

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
});

server.route(routes);

export const init = async () => {
    await server.initialize();
    return server;
};

export  const start = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

