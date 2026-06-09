require('dotenv').config();
const jwt = require('jsonwebtoken');
const Aluno = require('../models/aluno')
const bcryptjs = require('bcryptjs')

exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body

        const aluno = await Aluno.findOne({email})
        if(!aluno) return res.status(404).json({mensagem:"Usuairo não encontrado"})
        
        if(!bcryptjs.compareSync(password, aluno.password)) return res.status(401).json({mensagem:'senha invalida'})
        
        const token = jwt.sign(
            {
                id: aluno._id,
                nome:aluno.nome,
                role: 'aluno'
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).json({
                mensagem: 'Bem-vindo Aluno',
                token
            });
    }catch(err){
        res.json(err)
    }
}

exports.teste = async(req, res)=>{
    res.send(`aluno ${req.user.nome}`)
}