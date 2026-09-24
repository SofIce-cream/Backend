const express = require("express");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const tareaService = require("../services/tareaService");

/* 
****BUEN ERROR
JSON {
"ERROR": "El campo "texto" es obligaatorio para crear una tarea,
"field": "text",
"status": 400
}
****MAL ERROR
Err : Error: ValidationError: texto:Path "text" is required
*/

const router = express.Router();

const validarTarea = [
  body("text")
    .notEmpty()
    .withMessage("El texto es obligatorio")
    .isLength({ min: 5, max: 200 })
    .withMessage("El texto debe tener entre 5 y 200 caracteres")
    .trim(),
  body("prioridad")
    .optional()
    .isIn(["baja", "media", "alta"])
    .withMessage("La prioridad debe ser baja, media o alta"),
];

// GET / tareas
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
  }),
);

// GET /tareas/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no fue encontrada" });
    }
    res.json(tarea);
  }),
);

// POST /tareas
router.post(
  "/",
  validarTarea,
  asyncHandler(async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
    try {
    } catch (e) {}
  }),
);

// PUT /tareas/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { text, completed } = req.body;
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    if (text !== undenfined || text !== "" || text !== null) tarea.text = text;
    if (completed !== undenfined || completed !== null)
      tarea.completed = completed;
    await tarea.save();
  }),
);

// DELETE /tareas/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(200).send();
  }),
);

module.exports = router;
