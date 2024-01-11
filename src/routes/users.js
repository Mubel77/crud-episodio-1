const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');
const { check} = require('express-validator'); // Importa validationResult

const validateRegister = [
    check('nombre')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('apellido')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),

    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];

const validateLoginInput = [
  check('first_name')
      .notEmpty().withMessage('Debes completar el nombre').bail()
      .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  check('last_name')
      .notEmpty().withMessage('Debes completar el apellido').bail()
      .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),
  check('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', validateRegister, usersController.createUser);

router.get('/login', usersController.login);
router.post('/login', validateLoginInput,usersController.loginProccess);

module.exports = router;
