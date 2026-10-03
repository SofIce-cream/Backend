const express = require("express");
const authControllers = require("../controllers/authControllers");
const { validarRegistro, validarLogin } = require("../middleware/validators");

const router = express.Router();

/**
 @swagger
 * tags:
 *   name: Auth
 *   description: Registro e inicio de sesión
 */

/**
 * @swagger
 * /api/auth/registrar:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Sofía Puerta
 *               email:
 *                 type: string
 *                 example: sofia@example.com
 *               password:
 *                 type: string
 *                 example: clave123
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos o email ya registrado
 */
router.post("/registrar", validarRegistro, authControllers.registrar);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: sofia@example.com
 *               password:
 *                 type: string
 *                 example: clave123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el usuario y el token
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", validarLogin, authControllers.login);

module.exports = router;
