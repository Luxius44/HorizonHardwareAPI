'use strict'

export default class Categorie {
    id
    nom
    url
    constructor(obj) {
        Object.assign(this,obj)
    }
}
