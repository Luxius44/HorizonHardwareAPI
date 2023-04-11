'use strict'

import Hapi from '@hapi/hapi'
import Joi from 'joi'

import Inert from '@hapi/inert'
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import {adminController} from "./controler/controler.mjs";

const joiUser = Joi.object({
        login: Joi.string().required().description("login must be unique"),
        password: Joi.string().required().description("must an non-empty ")
}).description('User')

const joiUsers = Joi.array().items(joiUser).description("A collection of User")

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
    {
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return h.response({message: "not found"}).code(404)
        }
    },
    {
        method: 'GET',
        path: '/user',
        options: {
            description: 'Get User list',
            notes: 'Returns an array of user',
            tags: ['api'],
            response: {
                status: {
                    200 : joiUsers
                    }
                }
            },

        handler: async (request, h) => {
            //le message renvoyé et le code hhtp
            try {
                const  users = await adminController.findAll()
                return h.response(users).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{login}',
        options: {
            description: 'Get User',
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
                    200 : joiUser,
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
        method: 'POST',
        path: '/user',
        options: {
            description: 'Add User',
            notes: 'Returns added user',
            tags: ['api'],
            validate: {
                payload: joiUser
            },
            response: {
                status: {
                    201 : joiUser,
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
        path: '/user/{login}',
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
                    200 : joiUser,
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
        path: '/user/{login}',
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
                payload: joiUser
            },
            response: {
                status: {
                    200 : joiUser,
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
    }
]


// Configuration Hapi :

const server = Hapi.server({
    port: 8080,
    host: '172.31.47.60'
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

