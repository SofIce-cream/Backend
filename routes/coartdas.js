const express = require("express");
const coartadaController = require("../controllers/coartadaController");
const { autenticar } = require("../middleware/auth");
const { validarCoartada, validarVoto } = require("../middleware/validators");

const router = express.Router();
router.use(autenticar);

router.get("/", coartadaController.obtenerCoartadas);
router.get("/:id", coartadaController.obtenerCoartadaPorId);
router.post("/", validarCoartada, coartadaController.crearCoartada);
router.put("/:id", coartadaController.actualizarCoartada);
router.delete("/:id", coartadaController.eliminarCoartada);

// Alibi Chain (testigos)
router.post("/:id/testigo", coartadaController.unirseComoTestigo);
router.delete("/:id/testigo", coartadaController.desertarDeLaCadena);

// Votos y marcas
router.post("/:id/votar", validarVoto, coartadaController.votar);
router.post("/:id/marcar-falsa", coartadaController.marcarComoFalsa);
router.get("/:id/indice", coartadaController.obtenerIndice);

module.exports = router;