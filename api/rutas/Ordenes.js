const express = require('express');
const router = express.Router();
//Importa el modelo de la BD
const ordenes = require('../modelosBD/Ordenes');

//autenticacón
const {isAuthenticated, hasRoles} = require('../autenticacion/index');

//Toda la lista
router.get('/', (req, res) => {
    // res.send('Ordenes API');

    ordenes.find()
    .exec()
    .then(data => res.status(200).send(data) )
});

//Un solo elemento
router.get('/:id', (req, res) => {
    ordenes.findById(req.params.id)
    .exec()
    .then(data => res.status(200).send(data) );
});

//Cuando se vaya a crear una orden, ejecuta isAuthenticated, y modifica el objeto de request (req,)
//Si no se encuentra el usuario autenticado con un token, la petición es rechazada
router.post('/', isAuthenticated, (req,res) => {
    const {_id} = req.user;
    //Según dice... "crea una copia del req.body que viene de la parte del cliente y le pasamos
    //el user._id
    ordenes.create({...req.body, user_id: _id}).then(data => res.status(201).send(data))
});

router.put('/:id', isAuthenticated, (req,res) => {
    ordenes.findOneAndUpdate(req.params.id, req.body) //Body es lo nuevo a reemplazar
    .then( ()=> res.sendStatus(204))
});

router.delete('/:id', isAuthenticated, (req,res) => {
    ordenes.findOneAndDelete(req.params.id).exec().then( ()=> res.sendStatus(204))
});

module.exports = router;