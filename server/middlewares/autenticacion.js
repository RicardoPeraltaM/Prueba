const jwt = require('jsonwebtoken')



// ====================================
// Verificar Token
// ====================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario

        next();
    })
}

let VerificaRol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {

        return res.status(401).json({
            ok: false,
            err: {
                message: 'No se cuentan con los permisos suficientes pára realizar esta operación'
            }
        })
    }

    next();



}

module.exports = {
    verificaToken,
    VerificaRol
}