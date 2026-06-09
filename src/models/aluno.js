const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const AlunoShema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    matricula : {type: String, unique: true},
    curso: {type:String, required:true},
    criadoEm: {type: Date, default: Date.now}

})

const AlunoModel = mongoose.model('Aluno', AlunoShema)

module.exports = AlunoModel