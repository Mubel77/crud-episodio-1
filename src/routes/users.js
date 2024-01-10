const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');
const { check, validationResult } = require('express-validator'); // Importa validationResult

const validateRegister = [
    check('first_name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
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
router.post('/register', validateRegister, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  usersController.createUser(req, res, next);
});

router.get('/login', usersController.login);
router.post('/login', validateLoginInput, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  usersController.loginUp(req, res, next);
});

module.exports = router;
