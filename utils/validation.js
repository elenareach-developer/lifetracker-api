const { BadRequestError  } = require("./errors")

const isEmpty = (value) => value === null || typeof value === "undefined"

const validationFields = ({required, obj, location})=>{
    if(!obj) throw new BadRequestError('Missing object for vlaidation')
    required.forEach((item)=>{
        if(isEmpty(obj[item])){
            throw new  BadRequestError(`Required field - ${item} missing${location ? ` at ${location}` : ""}`)
        }
    })
}

module.exports = {validationFields, isEmpty}