const express = require("express");
const app = express();
const cors = require('cors')
const router = require('./router/routers')
const product = require('./router/productroute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/', router)
app.use('/', product)



app.listen(3500, () => {
    console.log("port at 3500")
})