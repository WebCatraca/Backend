require('dotenv').config();
const jwt = require('jsonwebtoken');
const Aluno = require('../models/aluno')
const Log = require('../models/log');
const bcryptjs = require('bcryptjs')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMEMAIL &&
            password === process.env.ADAPASSWORD
        ) {
            const token = jwt.sign(
                {
                    id: 'admin',
                    role: 'admin'
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json({
                mensagem: 'Bem-vindo Administrador',
                token
            });
        }

        return res.status(400).json({
            mensagem: 'Usuário ou senha incorretos'
        });

    } catch (err) {
        return res.status(500).json({
            mensagem: 'Erro interno do servidor'
        });
    }
};


exports.test = async(req,res)=>{
    res.send('Pega caralho')
}


exports.cadastroAluno = async(req, res)=>{
    try{
        const {nome, email, password, curso} = req.body

        const passwordHash = bcryptjs.hashSync(password , 10)

        const alunoExist = await Aluno.findOne({ email })
        if(alunoExist) return res.json('email ja existe')
        
        const aluno = await Aluno.create({nome: nome, email:email, password: passwordHash, curso:curso})

        aluno.matricula = aluno._id.toString().slice(-8);

        await aluno.save();


        return res.status(201).json({mensagem: "Aluno cadastrado com sucesso"})

    }catch(err){
        return res.json(err)
    }
}


exports.listar = async (req, res) => {

    try {

        const logs = await Log.find()
            .sort({ dataHora: -1 });

        return res.json(logs);

    } catch (err) {

        return res.status(500).json(err);

    }

};

exports.listarAlunos = async (req, res) => {
    try {

        const alunos = await Aluno.find(
            {},
            "-password -__v"
        ).sort({ nome: 1 });

        return res.status(200).json(alunos);

    } catch (err) {

        return res.status(500).json({
            mensagem: "Erro ao listar alunos.",
            erro: err.message
        });

    }
};
