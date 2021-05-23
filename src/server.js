const express =  require('express')
const { db } = require("./models/db")

const linksRoute = require('./routes/links')
const redirRoute = require('./routes/redirection')

const app = express()

app.use(express.json())

app.use('/api/links', linksRoute)
app.use('/', redirRoute)

db.sync()
    .then(() => console.log('db works'))
    .catch((err) => console.error(err))

app.listen(4445,()=>{
    console.log("server started on port: ",4445)
})