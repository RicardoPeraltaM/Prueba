 const express = require('express')
 const app = express()

 let { verificaToken, VerificaRol } = require('../middlewares/autenticacion')

 let Categoria = require('../models/categoria.model')


 // ====================================
 // Mostrar Categoria
 // ====================================


 app.get('/categoria', (req, res) => {

     if (req.query.termino !== undefined) {
         termino = new RegExp(`${req.query.termino}`)
     } else {
         termino = new RegExp()
     }


     Categoria.find({ nombre: termino })
         .populate('usuario') //2do parametro, lo que quieres recibir
         .exec((err, categoriaDB) => {
             if (err) {
                 return res.status(400).json({
                     ok: false,
                     err
                 })
             }
             res.json({
                 ok: true,
                 categoria: categoriaDB
             });


         })

 })


 // ====================================
 // Crear Categoria
 // ====================================

 app.post('/categoria', [verificaToken], (req, res) => {

     let body = req.body;


     let categoria = new Categoria({

         nombre: body.nombre,
         descripcion: body.descripcion,
         usuario: req.usuario._id

     })


     categoria.save((err, categoriaDB) => {

         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             })
         }

         res.json({
             ok: true,
             categoria: categoriaDB
         })

     })


 })



 // ====================================
 // Actualizar Categoria
 // ====================================

 app.put('/categoria/:id', (req, res) => {

     let id = req.params.id;
     let body = req.body;

     Categoria.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {

         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             })
         }


         res.json({
             ok: true,
             categoria: categoriaDB
         });



     })


 })



 // ====================================
 // Eliminar Categoria
 // ====================================

 app.delete('/categoria/:id', [verificaToken, VerificaRol], (req, res) => {

     Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             })
         }


         res.json({
             ok: true
         });


     })

 })


 module.exports = app