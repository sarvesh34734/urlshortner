const { URLs } = require("../models/db");
const { radix64toint, int2radix64 } = require("./radix64-service");

async function createRandomShortCode(link){
    
    // generate random number
    let genCode = parseInt(Math.random()*999999999999)

    // check for the generated random number in db
    let exists = await URLs.findOne({
        where: {
            id:genCode,
        },
    });

    // if not exist in db then return this code else re-iterate
    if(exists){
        return await createRandomShortCode(link)
    }

    return await URLs.create({
        id:genCode,
        code:int2radix64(genCode),
        link:link
    })

}

async function createCustomShortCode(shortCode,link){

    // check in db if the shortcode exists

    const id = radix64toint(shortCode)
    const exists = await URLs.findOne({
        where:{
            id:id
        }
    })

    // if it exists then return error
    if(exists){
        throw new Error("The link with code "+ code + "already exists")
    }

    // if it doesn't exists then create an entry in db
    return await URLs.create({
        id:id,
        code:shortCode,
        link:link
    })
}

async function findLongUrl(code){
    const id = radix64toint(code)
    return await URLs.findOne({
        where:{
            id:id
        }
    })
}

module.exports = {
    createCustomShortCode,
    createCustomShortCode,
    findLongUrl
}