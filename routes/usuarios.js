const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const usuarioService = require("../services/usuarioService");
const { autenticar, autorizar } = require("../middleware/auth");
const { verificarValidaciones } = require("../middleware/validators");

const router = express.Router();

// Todas las rutas de este archivo son solo para administradores
router.use(autenticar, autorizar("admin"));

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  })
);

router.put(
  "/:id/rol",
  body("role").isIn(["admin", "user"]).withMessage("El rol debe ser 'admin' o 'user'"),
  verificarValidaciones,
  asyncHandler(async (req, res) => {
    const usuario = await usuarioService.cambiarRol(req.params.id, req.body.role);
    res.json({ mensaje: "Rol actualizado correctamente", usuario });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await usuarioService.eliminarUsuario(req.params.id);
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  })
);

module.exports = router;