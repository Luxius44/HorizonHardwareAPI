'use strict'

export default class Categorie {
    id
    nom
    abreviation
    detail
    imgId
    constructor(obj) {
        Object.assign(this,obj)
    }
}
