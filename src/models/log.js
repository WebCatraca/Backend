const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },

    matricula: {
        type: String,
        required: true
    },

    nome: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        enum: ['ENTRADA', 'SAIDA'],
        default: 'ENTRADA'
    },

    acesso: {
        type: Boolean,
        default: true
    },

    metodo: {
        type: String,
        default: 'QR_CODE'
    },

    dataHora: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Log', LogSchema);