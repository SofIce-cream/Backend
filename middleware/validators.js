const { body, validationResult } = require("express-validator");

function verificarValidaciones(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const primerError = errors.array()[0];
    return res.status(400).json({
      error: primerError.msg,
      field: primerError.path || primerError.param,
      status: 400,
    });
  }
  next();
}

// Reglas para registrar usuario
const validarRegistro = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Ingrese un correo válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  verificarValidaciones,
];

// Reglas para el login
const validarLogin = [
  body("email").trim().isEmail().withMessage("Ingrese un correo válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  verificarValidaciones,
];

// Reglas para crear/actualizar tareas
const validarTarea = [
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage('El campo "titulo" es obligatorio para la tarea')
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres"),
  body("estado")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada"])
    .withMessage("El estado debe ser: pendiente, en_progreso o completada"),
  body("prioridad")
    .optional()
    .isIn(["baja", "media", "alta"])
    .withMessage("La prioridad debe ser: baja, media o alta"),
  verificarValidaciones,
];

module.exports = { verificarValidaciones, validarRegistro, validarLogin, validarTarea };