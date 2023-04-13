'use strict'

export default class Article {
    id 
    titre  
    description 
    contenu 
    imgId 
    imgsId  
    tag 
    tags  
    data 
    constructor(obj) {
        Object.assign(this,obj)
    }
}
