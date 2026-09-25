const express = require("express");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const Tarea = require("../models/Tarea");
const { autenticar } = require("../middleware/auth");

const router = express.Router();
router.use(autenticar);

const validarTarea = [
  body("titulo")
    .notEmpty()
    .withMessage('El campo "titulo" es obligatorio para la tarea')
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres")
    .trim(),
  body("estado")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada"])
    .withMessage("El estado debe ser: pendiente, en_progreso o completada"),
  body("prioridad")
    .optional()
    .isIn(["baja", "media", "alta"])
    .withMessage("La prioridad debe ser: baja, media o alta"),
];

const procesarValidaciones = (req, res, next) => {
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
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Verificación de ROL en español ('admin')
    const filtro = req.usuario.rol === "admin" ? {} : { usuario: req.usuario._id };
    const tareas = await Tarea.find(filtro).populate("usuario", "nombre email rol");
    res.json(tareas);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id).populate("usuario", "nombre email rol");

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada", status: 404 });
    }

    if (tarea.usuario._id.toString() !== req.usuario._id.toString() && req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para ver esta tarea", status: 403 });
    }

    res.json(tarea);
  })
);

router.post(
  "/",
  validarTarea,
  procesarValidaciones,
  asyncHandler(async (req, res) => {
    const { titulo, descripcion, estado, prioridad } = req.body;

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      estado,
      prioridad,
      usuario: req.usuario._id, 
    });

    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  })
);

router.put(
  "/:id",
  validarTarea,
  procesarValidaciones,
  asyncHandler(async (req, res) => {
    const { titulo, descripcion, estado, prioridad } = req.body;
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada", status: 404 });
    }

   if (tarea.usuario.toString() !== req.usuario._id.toString() && req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para actualizar esta tarea", status: 403 });
    }

    if (titulo !== undefined && titulo !== "") tarea.titulo = titulo;
    if (descripcion !== undefined) tarea.descripcion = descripcion;
    if (estado !== undefined) tarea.estado = estado;
    if (prioridad !== undefined) tarea.prioridad = prioridad;

    await tarea.save();

    res.json(tarea);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada", status: 404 });
    }

    // Verificar permisos por ROL o Propiedad
    if (tarea.usuario.toString() !== req.usuario._id.toString() && req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para eliminar esta tarea", status: 403 });
    }

    await tarea.deleteOne();
    res.status(200).json({ mensaje: "Tarea eliminada exitosamente" });
  })
);

module.exports = router;
