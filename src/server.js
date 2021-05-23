const express =  require('express')
const { db } = require("./models/db")
const app = express()

db.sync({force=true})
    .then(() => console.log('db works'))
    .catch((err) => console.error(err))

app.get("/",(req,res)=>{
    res.send("Hello World")
})



app.listen(3000,()=>{
    console.log("server started on port: ",3000)
})