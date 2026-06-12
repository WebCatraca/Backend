const express = require('express')
const route = express.Router()
const admController = require('./src/controllers/admController')
const alunoController = require('./src/controllers/alunoController')
const logController = require('./src/controllers/logController')

const tokenMiddleware = require('./src/middlewares/authToken')

// Adm
route.post('/adm/login', admController.login)
route.get('/adm/teste', tokenMiddleware.authToken,tokenMiddleware.isAdm, admController.test)
route.post('/adm/cadastroAluno', tokenMiddleware.authToken, tokenMiddleware.isAdm, admController.cadastroAluno)
route.get('/adm/logs',tokenMiddleware.authToken, tokenMiddleware.isAdm, admController.listar)
route.get('/adm/alunos',tokenMiddleware.authToken, tokenMiddleware.isAdm, admController.listarAlunos)

//log
route.post('/catraca/validar', logController.validar)

// Aluno
route.post('/aluno/login', alunoController.login)
route.get('/aluno/qrcode', tokenMiddleware.authToken, tokenMiddleware.isAluno, alunoController.qrCode)
route.get('/aluno/perfil', tokenMiddleware.authToken, tokenMiddleware.isAluno, alunoController.perfil)


module.exports = route