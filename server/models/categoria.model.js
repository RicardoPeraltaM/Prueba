const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;



let categoriaSchema = new Schema({

    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la categoria es necesario']
    },

    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion de la categoria es necesaria']

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    }


})

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('CategoriaModel', categoriaSchema)