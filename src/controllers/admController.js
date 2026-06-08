require('dotenv').config();
const jwt = require('jsonwebtoken');

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

