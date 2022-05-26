const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuarios = mongoose.model('Usuario', new Schema({
    email: String,
    password: String,
    salt: String,
    role: { type: String, default: 'user'}
}));

module.exports = Usuarios;