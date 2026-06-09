const express = require('express')
const route = express.Router()
const admController = require('./src/controllers/admController')

const tokenMiddleware = require('./src/middlewares/authToken')

route.post('/adm/loginADM', admController.login)
route.get('/adm/teste', tokenMiddleware.authToken,tokenMiddleware.isAdm, admController.test)
route.post('/adm/cadastroAluno', tokenMiddleware.authToken, tokenMiddleware.isAdm, admController.cadastroAluno)



module.exports = route