'use strict'

export default class Admin {
    login
    password
    token
    constructor(obj) {
        Object.assign(this,obj)
    }
}
