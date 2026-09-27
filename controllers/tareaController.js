const tareaService = require("../services/tareaService");
const asyncHandler = require("../utils/asyncHandler");

const obtenerTareas = asyncHandler(async (req, res) => {
  const tareas = await tareaService.listarTareas(req.usuario);
  res.status(200).json({ ok: true, count: tareas.length, tareas });
});

const obtenerTareaPorId = asyncHandler(async (req, res) => {
  const tarea = await tareaService.obtenerTareaPorId(req.params.id, req.usuario);
  res.status(200).json({ ok: true, tarea });
});

const crearTarea = asyncHandler(async (req, res) => {
  const tarea = await tareaService.crearTarea(req.body, req.usuario);
  res.status(201).json({ ok: true, mensaje: "Tarea creada exitosamente", tarea });
});

const actualizarTarea = asyncHandler(async (req, res) => {
  const tarea = await tareaService.actualizarTarea(req.params.id, req.body, req.usuario);
  res.status(200).json({ ok: true, mensaje: "Tarea actualizada", tarea });
});

const eliminarTarea = asyncHandler(async (req, res) => {
  await tareaService.eliminarTarea(req.params.id, req.usuario);
  res.status(200).json({ ok: true, mensaje: "Tarea eliminada correctamente" });
});

module.exports = {obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea,};