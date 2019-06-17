const express = require('express')
const app = express()


const { verificaToken } = require('../middlewares/autenticacion')


let Producto = require('../models/productos.model')


// ====================================
// Obtener Productos
// ====================================

app.get('/productos', (req, res) => {

})




// ====================================
// Postear Producto
// ====================================
app.get('/productos', verificaToken, (req, res) => {


})



module.exports = app;