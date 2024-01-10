const { validationResult } = require('express-validator');
const { leerArchivo, escribirArchivo } = require('../data/funcion');

const usersController = {
  register: function(req, res, next) {
    res.render('register', { title: 'Registro' });
  },

  createUser: function(req, res, next) {
    const users = leerArchivo('users');
    const { first_name, 'last-name': lastName, email, password } = req.body;
    const newUser = {
      first_name: first_name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim()
    };

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      users.push(newUser);
      escribirArchivo(users, 'users');
      res.redirect('/');
    } else {
      // There are errors, render the registration form with error messages
      res.render('register', {
        title: 'Registro',
        errors: errors.mapped(),
        old: req.body
      });
    }
  },

  login: function(req, res, next) {
    res.render('login', { title: 'Login' });
  },

  loginUp: function(req, res, next) {
    res.redirect('/');
  },
};

module.exports = usersController;
