'use strict'

import Hapi from '@hapi/hapi'
import Joi from 'joi'

import Inert from '@hapi/inert'
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import {adminController} from "./controller/controllerAdmin.mjs";
import {categorieController} from "./controller/controllerCategorie.mjs";
import {dealController} from "./controller/controllerDeal.mjs";


const joiAdmin = Joi.object({
        login: Joi.string().required().description("login must be unique"),
        password: Joi.string().required().description("must an non-empty ")
}).description('User')

const joiCategorie = Joi.object({
    id: Joi.number().required().description("id of the categorie, autoincrement"),
    nom: Joi.string().required().description("name of the categorie"),
    imgId: Joi.string().required().description("id of the image of the categorie")
})

const joiCategorieAdd = Joi.object({
    nom: Joi.string().required().description("name of the categorie"),
    imgId: Joi.string().required().description("id of the image of the categorie")
})

const joiCategories = Joi.array().items(joiCategorie).description("A collection of Categorie")

const joiDeal = Joi.object({
    id: Joi.number().required().description("id of the deal, autoincrement"),
    catId : Joi.number().required().description("id of the categorie"),
    nom: Joi.string().required().description("name of the deal"),
    prix: Joi.number().required().description("price of the deal"),
    promo: Joi.number().required().description("promo price of the deal"),
    date : Joi.date().required().description("release date of the deal"),
    detail : Joi.string().required().description("unique information link to this deal"),
    imgId: Joi.string().required().description("id of the image of the categorie"),
    urlWeb: Joi.string().required().description("url of the product")
})

const joiDealAdd = Joi.object({
    catId : Joi.number().required().description("id of the categorie"),
    nom: Joi.string().required().description("name of the deal"),
    prix: Joi.number().required().description("price of the deal"),
    promo: Joi.number().required().description("promo price of the deal"),
    date : Joi.date().required().description("release date of the deal"),
    detail : Joi.string().required().description("unique information link to this deal"),
    imgId: Joi.string().required().description("id of the image of the categorie"),
    urlWeb: Joi.string().required().description("url of the product")
})

const joiDeals = Joi.array().items(joiDeal).description("A collection of Deal")

const joiId = Joi.object({id : Joi.number().required().description("id of the object")})

const joiToken = Joi.object({
    token: Joi.string().required().description("Le token associé au compte utilisateur")
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
            return h.response({message: "not found"}).code(404)
        }
    },
    // Admin :
    {
        method: 'GET',
        path: '/admin/{login}',
        options: {
            description: 'Get Admin',
            notes: 'Returns a user or un an error message',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    login : Joi.string()
                        .required()
                        .description('the login for the user'),
                })
            },
            response: {
                status: {
                    200 : joiAdmin,
                    404 : notFound
                }
            }
        },
        
        handler: async (request, h) => {
            try {
                const user = await adminController.findByLogin(request.params.login)
               if (user == null)
                    return h.response({message: 'not found'}).code(404)
                else
                    return h.response(user).code(200)
            } catch (e) {
                return h.response({message: 'not found'}).code(404)
            }
        }
    },
    {
        method: 'PUT',
        path: '/admin/login',
        options : {
            description : 'Permet de se connecter à un compte existant',
            notes : 'Permet de se connecter à un compte existant',
            tags : ['api'],
            validate: {
                payload: joiAdmin
            },
            response: {
                status: {
                    201 : joiToken.description("Le token permettant d'effectuer les actions liées au compte"),
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = request.payload

                const token = await controller.login(user)
                
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
            description: 'Add User',
            notes: 'Returns added user',
            tags: ['api'],
            validate: {
                payload: joiAdmin
            },
            response: {
                status: {
                    201 : joiAdmin,
                    400 : errorMessage
                }
            }

        },
        handler: async (request, h) => {
            try {
                //Le body est accessible via request.payload
                const userToAdd = request.payload
                const user = await adminController.add(userToAdd)
                return h.response(user).code(201)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method: 'DELETE',
        path: '/admin/delete/{login}',
        options: {
            description: 'Delete User',
            notes: 'Returns the deleted user or un an error message',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    login : Joi.string()
                        .required()
                        .description('the login for the user'),
                })
            },
            response: {
                status: {
                    200 : joiAdmin,
                    404 : notFound
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = await adminController.deleteByLogin(request.params.login)
                return h.response(user).code(200)
            } catch (e) {
                return h.response({message: 'not found'}).code(404)
            }
        }
        },
    {
        method: 'PUT',
        path: '/admin/update/{login}',
        options: {
            description: 'Update User',
            notes: 'Returns a user or un an error message',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    login : Joi.string()
                        .required()
                        .description('the login for the user'),
                }),
                payload: joiAdmin
            },
            response: {
                status: {
                    200 : joiAdmin,
                    400 : errorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = await adminController.update(request.params.login, request.payload)
                return h.response(user).code(200)
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Deal :
    {
        method : 'GET',
        path: '/deal',
        options: {
            description: 'Get all the Deals',
            notes: 'Returns array of Deals',
            tags: ['api'],
            response: {
                status: {
                    200 : joiDeals,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deals = await dealController.findAll()
                return deals
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'GET',
        path: '/deal/{categorieId}',
        options: {
            description: 'Get the deals associate to the categorieId',
            notes: 'Returns a Deals',
            tags: ['api'],
            validate: {
                params : Joi.object({categorieId:Joi.number().required().description("id of the categorie")}) 
            },
            response: {
                status: {
                    200 : joiDeals,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deals = await dealController.findByCatId(request.params.categorieId)
                return deals
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'POST',
        path: '/deal',
        options: {
            description: 'Add Deal',
            notes: 'Returns the added Deal',
            tags: ['api'],
            validate : {
                payload : joiDealAdd
            },
            response: {
                status: {
                    200 : joiDeal,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deal = await dealController.add(request.payload)
                return deal
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'PUT',
        path: '/deal/{id}',
        options: {
            description: 'Update Deal',
            notes: 'Returns the updated Deal',
            tags: ['api'],
            validate : {
                params: Joi.object({
                    id : Joi.number().required().description("id of the Deal")
                }),
                payload : joiDealAdd
            },
            response: {
                status: {
                    200 : joiDeal,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const deal = await dealController.update(request.params.id,request.payload)
                return deal
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'DELETE',
        path: '/deal/{id}',
        options: {
            description: 'Delete the Deal',
            notes: 'Returns the deleted Deal',
            tags: ['api'],
            validate : {
                params : joiId
            },
            response: {
                status: {
                    200 : joiDeal,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categories = await categorieController.delete()
                return categories
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    // Categorie :
    {
        method : 'GET',
        path: '/categorie',
        options: {
            description: 'Get all Categories',
            notes: 'Returns array of Categories',
            tags: ['api'],
            response: {
                status: {
                    200 : joiCategories,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categories = await categorieController.findAll()
                return categories
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'GET',
        path: '/categorie/{id}',
        options: {
            description: 'Get a Categorie by is id',
            notes: 'Returns a Categorie',
            tags: ['api'],
            validate: {
                params : joiId
            },
            response: {
                status: {
                    200 : joiCategorie,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.findById(request.params.id)
                return categorie
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'POST',
        path: '/categorie',
        options: {
            description: 'Add Categorie',
            notes: 'Returns the added Categorie',
            tags: ['api'],
            validate : {
                payload : joiCategorieAdd
            },
            response: {
                status: {
                    200 : joiCategorie,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.add(request.payload)
                return categorie
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'PUT',
        path: '/categorie/{id}',
        options: {
            description: 'Update Categorie',
            notes: 'Returns the updated Categorie',
            tags: ['api'],
            validate : {
                params: joiId ,
                payload : joiCategorieAdd
            },
            response: {
                status: {
                    200 : joiCategorie,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.update(request.params.id,request.payload)
                return categorie
            } catch (e) {
                return h.response({message: 'error'}).code(400)
            }
        }
    },
    {
        method : 'DELETE',
        path: '/categorie/{id}',
        options: {
            description: 'Delete Categorie',
            notes: 'Returns the deleted Categorie',
            tags: ['api'],
            validate : {
                params : joiId
            },
            response: {
                status: {
                    200 : joiCategorie,
                    404 : notFound,
                    400 : errorMessage
                }
            }
        },
        handler: async (request,h) => {
            try {
                const categorie = await categorieController.delete(request.params.id)
                return categorie
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
]


// Configuration Hapi :

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
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

