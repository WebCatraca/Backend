const express = require('express')
const route = express.Router()
const admController = require('./src/controllers/admController')

const tokenMiddleware = require('./src/middlewares/authToken')

route.post('/loginADM', admController.login)
route.get('/teste', tokenMiddleware.authToken,tokenMiddleware.isAdm, admController.test)



module.exports = route