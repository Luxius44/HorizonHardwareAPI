'use strict'

export default class Article {
    id 
    titre  
    description 
    contenu 
    imgId   
    tag 
    tags  
    date 
    constructor(obj) {
        Object.assign(this,obj)
    }
}
