require('dotenv').config
const jwt = require('jsonwebtoken');

exports.authToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensagem: 'Token não informado'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            mensagem: 'Token inválido'
        });
    }
};

exports.isAdm = (req,res,next)=>{
    if(req.user.role ==='admin'){
        return next()
    }
    return res.status(403).json({ mensagem: 'Acesso negado. Somente administradores podem acessar esta rota.' })
}