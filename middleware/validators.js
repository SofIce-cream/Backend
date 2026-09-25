const { validationResult } = require("express-validator");

function verificarValidaciones(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

//Reglas para registrar usuario
const validarRegistro = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("email").trim().notEmpty().withMessage("Ingrese un correo válido"),
  body("password").isLength({min:6}).withMessage("La constraseña debe tener al menos 6 caracteres"),
  verificarValidaciones,
];

//Reglas para el login
const validarLogin = [
  body("email").trim().isEmail().withMessage("ingrese un correo válido"),
  body("password").notEmpty().withMessage("La constraseña es obligatoria"),
  verificarValidaciones,
];

//Reglas para crear/actualizar tareas
const validarTarea = [
  body("titulo").trim().notEmpty().withMessage("El título de la tarea es obligatorio"),
  body("estado").optional().isIn(["pendiente", "en_progreso", "completada"]).withMessage("El estado ingresado no es válido"),
  verificarValidaciones,
];

module.exports = { verificarValidaciones, validarRegistro, validarLogin, validarTarea };
