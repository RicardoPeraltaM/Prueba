const express = require('express');
const app = express();
const Usuario = require('../models/usuarios.model')
const _ = require('underscore')
const bcrypt = require('bcrypt')

const { verificaToken, VerificaRol } = require('../middlewares/autenticacion')

app.get('/usuario', [verificaToken, VerificaRol], (request, response) => {


    let desde = Number(request.query.desde) || 0;
    let limite = Number(request.query.limite) || 5;
    let termino;

    if (request.query.termino !== undefined) {
        termino = new RegExp(`${request.query.termino}`)
    } else {
        termino = new RegExp()
    }






    Usuario.find({ nombre: termino, estado: true }).skip(desde).limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return response.status(400).json({
                    ok: false,
                    err
                })
            }


            Usuario.countDocuments({ estado: true }, (err, count) => {
                if (err) {
                    return response.status(400).json({
                        ok: false,
                        err
                    })
                }


                response.json({
                    ok: true,
                    count,
                    usuarios
                })
            })




        })






})








app.post('/usuario', [verificaToken, VerificaRol], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    })

    usuario.save((err, UsuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: UsuarioDB
        })


    })

})

app.put('/usuario/:id', [verificaToken, VerificaRol], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, UsuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            usuario: UsuarioDB
        });


    })

})


app.delete('/usuario/:id', [verificaToken, VerificaRol], (request, response) => {
    let id = request.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, UsuarioDB) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }
        response.json({
            ok: true,
            usuario: UsuarioDB
        });



    })

})


module.exports = app;