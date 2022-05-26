const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ordenes = require('./rutas/Ordenes');
const alimentos = require('./rutas/Alimentos');
const autenticacion = require('./rutas/Autenticacion');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true });
app.use('/api/ordenes', ordenes);
app.use('/api/alimentos', alimentos);
app.use('/api/autenticacion', autenticacion);

module.exports = app;

//Que ya no se usa cors? para qué era?
const cors = require('cors');
app.use(cors()); 