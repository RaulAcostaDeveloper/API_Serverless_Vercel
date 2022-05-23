//Orders.js === Ordenes.js
const mongoose = require('mongoose');
//Schema es un conjunto lógico dentro de una base de datos
const Schema = mongoose.Schema;

//una orden se compone del Usuario que la pide y el Alimento que solicita
const Ordenes = mongoose.model('Orden', new Schema({
    alimento_id: {type: Schema.Types.ObjectId, ref: 'Orden' },
    usuario_id: String,
}));

module.exports = Ordenes;