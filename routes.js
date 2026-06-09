const express = require('express')
const route = express.Router()
const admController = require('./src/controllers/admController')
const alunoController = require('./src/controllers/alunoController')

const tokenMiddleware = require('./src/middlewares/authToken')

// Adm
route.post('/adm/login', admController.login)
route.get('/adm/teste', tokenMiddleware.authToken,tokenMiddleware.isAdm, admController.test)
route.post('/adm/cadastroAluno', tokenMiddleware.authToken, tokenMiddleware.isAdm, admController.cadastroAluno)

// Aluno
route.post('/aluno/login', alunoController.login)
route.get('/aluno/teste', tokenMiddleware.authToken, tokenMiddleware.isAluno, alunoController.teste)


module.exports = route