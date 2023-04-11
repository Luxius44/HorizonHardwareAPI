'use strict'

export default class Deal {
    id
    catId
    nom
    prix
    promo
    date
    detail
    url_img
    url_web
    constructor(obj) {
        Object.assign(this,obj)
    }
}
