'use strict'

export default class Categorie {
    id
    nom
    detail
    imgId
    constructor(obj) {
        Object.assign(this,obj)
    }
}
