require('dotenv').config();
const jwt = require('jsonwebtoken');
const Aluno = require('../models/aluno')
const bcryptjs = require('bcryptjs')
const qrCode = require('qrcode')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const aluno = await Aluno.findOne({ email })
        if (!aluno) return res.status(404).json({ mensagem: "Usuairo não encontrado" })

        if (!bcryptjs.compareSync(password, aluno.password)) return res.status(401).json({ mensagem: 'senha invalida' })

        const token = jwt.sign(
            {
                id: aluno._id,
                nome: aluno.nome,
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
    } catch (err) {
        res.json(err)
    }
}

exports.perfil = async (req, res) => {

    try {

        const aluno = await Aluno.findById(req.user.id).select("-password");

        if (!aluno) {

            return res.status(404).json({
                mensagem: "Aluno não encontrado."
            });

        }

        return res.status(200).json(aluno);

    } catch (err) {

        return res.status(500).json({
            mensagem: err.message
        });

    }

};

exports.qrCode = async (req, res) => {
    try {

        const aluno = await Aluno.findById(req.user.id);

        if (!aluno) {
            return res.status(404).json({
                mensagem: "Aluno não encontrado."
            });
        }

        const qr = await qrCode.toDataURL(
            JSON.stringify({
                id: aluno._id,
                matricula: aluno.matricula
            })
        );

        return res.status(200).json({
            nome: aluno.nome,
            matricula: aluno.matricula,
            curso: aluno.curso,
            qrCode: qr
        });

    } catch (err) {

        return res.status(500).json({
            mensagem: "Erro interno do servidor.",
            erro: err.message
        });

    }
};