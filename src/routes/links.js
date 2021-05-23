const { Router } = require('express')
const { radix64toint } = require('../services/radix64-service')
const { createRandomShortCode,createCustomShortCode, findLongUrl } = require('../services/url-service')
const route = Router()

route.post('/',async (req,res)=>{
    // fetch parameters from request body
    const link = req.body.link
    const code = req.body.code

    // if custom code is not provides then generate random short code
    if(!code){
        const url = await createRandomShortCode(link)
        return res.json(url)
    }
    // if custom code is provided then generate that code
    try{
        const url = await createCustomShortCode(code,link)
        return res.json(url)
    }catch(e){
        return res.status(400).json({error:e.message});
    }
});


// get request
route.get("/:code",async (req,res)=>{
    // fetch code from params
    const code = req.params.code

    // check for the code in db
    const url = await findLongUrl(code)

    // if exists return res else throw error
    if(url){
        return res.json(url)
    }else{
        return res.status(404).json({error:"No such link exists"})
    }
})

module.exports = route;

