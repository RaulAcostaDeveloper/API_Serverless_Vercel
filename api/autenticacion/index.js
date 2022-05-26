//Verifica el token para saber si el usuario está autenticado
const jwt = require('jsonwebtoken');
const usuarios = require('../modelosBD/Usuarios');

const isAuthenticated = (req, res, next) => {
    //Extrae el token
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    //Recibe el token secreto de signToken
    //El callback recibe un error y el token decodificado
    jwt.verify(token, 'mi-secreto', (error, decoded) => {
        //Extrae el ID del token decodificado
        const {_id} = decoded;
        usuarios.findOne({_id}).exec() //Ejecuta la consulta
        .then( user => {// ya encontró el usuario
            //modifica el request (req,)
            req.user = user;
            next();
        })
    });
}

const hasRoles = role => (req, res, next) => {
    if (hasRoles.indexOf(req.user.role) > -1){
        return next();
    }
    res.sendStatus(403);
}

module.exports = {
    isAuthenticated,
    hasRoles,
}