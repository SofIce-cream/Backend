const express = require("express");
const { body, validationResult } = require("express-validator");
const authControllers = require("../controllers/authControllers");
const { verificarValidaciones } = require("../middlewares/validaciones");

const router = express.Router();

const validarRegistro = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

router.post(
  "/registrar",
  validarRegistro,
  verificarValidaciones,
  authControllers.registrar,
);


module.exports = router;