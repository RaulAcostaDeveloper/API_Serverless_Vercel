const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const usuarios = require('../modelosBD/Usuarios');
const router = express.Router();
const { isAuthenticated } = require('../autenticacion/index');
//Genera el token
const signToken = (_id) => {
    return jwt.sign({_id}, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    });
}

router.post('/register', (req,res) => {
    const {email, password } = req.body;
    crypto.randomBytes(16, (error, salt) => {
        const newSalt = salt.toString('base64');
        //Recibe password, salt, numero de iteraciones de encriptación, 
        //longitud de la llave, algoritmo de encriptación, callback
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (error, key)=> {
            const encryptedPassword = key.toString('base64');
            usuarios.findOne({ email }).exec()
            .then(user => {
                if (user) {
                    return res.send('usuario ya existe');
                }
                usuarios.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt
                }).then(()=>{
                    res.send('usuario Creado con éxito');
                })
            })
        });
    });
});

router.post('/login', (req,res) => {
    const { email, password } = req.body;
    usuarios.findOne( {email}).exec()
    .then(user => {
        if(!user) {
            return res.send('usuario y/o contraseña incorrecta');
        }
        //Usa el salt que está ya en la base de datos
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (error, key)=> {
            const encryptedPassword = key.toString('base64');
            if (user.password === encryptedPassword) {

                const token = signToken(user._id);
                //El token de autenticación para que el usuario pueda comunicarse con el servidor
                return res.send({token});
            }
            return res.send('usuario y/o contraseña incorrecta');
        });
    })
});

router.get('/me', isAuthenticated, (req,res) => {
    res.send(req.user);
})
module.exports = router;