const express = require("express");
const tareaController = require("../controllers/tareaController");
const { autenticar } = require("../middleware/auth");
const { validarTarea } = require("../middleware/validators");

const router = express.Router();
router.use(autenticar);

router.get("/", tareaController.obtenerTareas);
router.get("/:id", tareaController.obtenerTareaPorId);
router.post("/", validarTarea, tareaController.crearTarea);
router.put("/:id", validarTarea, tareaController.actualizarTarea);
router.delete("/:id", tareaController.eliminarTarea);

module.exports = router;