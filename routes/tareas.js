const express = require("express");
const tareaController = require("../controllers/tareaController");
const { autenticar } = require("../middleware/auth");
const { validarTarea } = require("../middleware/validators");

const router = express.Router();
router.use(autenticar);

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Gestión de tareas (requiere autenticación)
 */

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Lista las tareas (admin ve todas, user solo las suyas)
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       401:
 *         description: No autenticado
 */
router.get("/", tareaController.obtenerTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       403:
 *         description: No tienes permisos para ver esta tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", tareaController.obtenerTareaPorId);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo]
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Terminar el backend
 *               descripcion:
 *                 type: string
 *                 example: Revisar validaciones y roles
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completada]
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *     responses:
 *       201:
 *         description: Tarea creada
 *       400:
 *         description: Datos inválidos
 */
router.post("/", validarTarea, tareaController.crearTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completada]
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       403:
 *         description: No tienes permisos para actualizar esta tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", validarTarea, tareaController.actualizarTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       403:
 *         description: No tienes permisos para eliminar esta tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", tareaController.eliminarTarea);

module.exports = router;