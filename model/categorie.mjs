'use strict'

export default class Categorie {
    id
    nom
    imgId
    constructor(obj) {
        Object.assign(this,obj)
    }
}
