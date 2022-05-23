//Meals.js === Alimentos.js
const mongoose = require('mongoose');
//Schema es un conjunto lógico dentro de una base de datos
const Schema = mongoose.Schema;

const Alimentos = mongoose.model('Alimento', new Schema({
    nombreAlimento: String,
    descripcionAlimento: String,
}));

//NOTA, cada elemento tiene un identificador Unico e Irrepetible (ID Automático)
module.exports = Alimentos;