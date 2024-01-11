const { validationResult } = require('express-validator');
const { leerArchivo, escribirArchivo } = require('../data/funcion');

const usersController = {
  register: function(req, res, next) {
    res.render('register', { title: 'Registro' });
  },

  createUser: function(req, res, next) {

    const errors= validationResult(req);

    if (errors.errors.length > 0){
      res.render('register', { title: 'Registro', errors:errors.mapped(), oldData:req.body});
    } else {
      const users = leerArchivo('users');
      const { nombre, apellido, email, password } = req.body;
      const newUser = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password
      };
      users.push(newUser);
      escribirArchivo(users, 'users');
      res.redirect('/');
    }
  },

  login: function(req, res, next) {
    res.render('login', { title: 'Login' });
  },

  loginProccess: function(req, res, next) {
    res.redirect('/');
  },
};

module.exports = usersController;
