const express = require('express');
const app = express();
const Usuario = require('../models/usuarios.model')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }


        if (!UsuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrecto'
                }
            })
        }


        if (!bcrypt.compareSync(body.password, UsuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrecto'
                }
            })


        }

        let token = jwt.sign({
            usuario: UsuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })


        res.json({
            ok: true,
            usuario: UsuarioDB,
            token
        })
    })
})


module.exports = app