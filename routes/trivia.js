const express = require("express");
const triviaController = require("../controllers/triviaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trivia
 *   description: Preguntas de trivia (consumo de API externa)
 */

/**
 * @swagger
 * /api/trivia:
 *   get:
 *     summary: Obtiene preguntas de trivia desde una API externa
 *     tags: [Trivia]
 *     parameters:
 *       - in: query
 *         name: cantidad
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Número de preguntas (1-20)
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           default: multiple
 *     responses:
 *       200:
 *         description: Lista de preguntas de trivia
 *       400:
 *         description: Cantidad fuera de rango
 */
router.get("/", triviaController.obtenerTrivia);

module.exports = router;
