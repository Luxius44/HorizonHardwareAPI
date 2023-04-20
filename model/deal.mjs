'use strict'

export default class Deal {
    id
    catId
    nom
    prix
    promo
    date
    detail
    imgId
    urlWeb
    constructor(obj) {
        Object.assign(this,obj)
    }
}
