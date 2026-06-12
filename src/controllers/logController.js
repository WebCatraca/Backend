const Aluno = require('../models/aluno');
const Log = require('../models/log');


exports.validar = async (req, res) => {
    try {

        const { matricula } = req.body;

        if (!matricula) {
            return res.status(400).json({
                acesso: false,
                mensagem: "Matrícula não informada."
            });
        }

        // Procura o aluno
        const aluno = await Aluno.findOne({ matricula });

        if (!aluno) {
            return res.status(404).json({
                acesso: false,
                mensagem: "Aluno não encontrado."
            });
        }

        // Busca o último registro desse aluno
        const ultimoLog = await Log.findOne({
            aluno: aluno._id
        }).sort({ dataHora: -1 });

        // Define se é entrada ou saída
        let tipo = "ENTRADA";

        if (ultimoLog && ultimoLog.tipo === "ENTRADA") {
            tipo = "SAIDA";
        }

        // Salva o novo log
        await Log.create({
            aluno: aluno._id,
            matricula: aluno.matricula,
            nome: aluno.nome,
            tipo,
            acesso: true,
            metodo: "QR_CODE"
        });

        return res.status(200).json({
            acesso: true,
            tipo,
            nome: aluno.nome,
            matricula: aluno.matricula,
            mensagem: `${tipo} registrada com sucesso.`
        });

    } catch (err) {

        return res.status(500).json({
            acesso: false,
            mensagem: "Erro interno do servidor.",
            erro: err.message
        });

    }
};