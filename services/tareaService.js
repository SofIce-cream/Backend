const Tarea = require("../models/Tarea");

// Lista las tareas: un admin ve todas, un user solo las suyas
async function listarTareas(usuarioActual) {
  const filtro = usuarioActual.role === "admin" ? {} : { usuario: usuarioActual._id };
  return await Tarea.find(filtro).populate("usuario", "nombre email role");
}

async function obtenerTareaPorId(id, usuarioActual) {
  const tarea = await Tarea.findById(id).populate("usuario", "nombre email role");

  if (!tarea) {
    throw { status: 404, message: "Tarea no encontrada" };
  }

  if (
    tarea.usuario._id.toString() !== usuarioActual._id.toString() &&
    usuarioActual.role !== "admin"
  ) {
    throw { status: 403, message: "No tienes permisos para ver esta tarea" };
  }

  return tarea;
}

async function crearTarea(data, usuarioActual) {
  const { titulo, descripcion, estado, prioridad } = data;

  const nuevaTarea = new Tarea({
    titulo,
    descripcion,
    estado,
    prioridad,
    usuario: usuarioActual._id,
  });

  await nuevaTarea.save();
  return nuevaTarea;
}

async function actualizarTarea(id, data, usuarioActual) {
  const { titulo, descripcion, estado, prioridad } = data;
  const tarea = await Tarea.findById(id);

  if (!tarea) {
    throw { status: 404, message: "Tarea no encontrada" };
  }

  if (
    tarea.usuario.toString() !== usuarioActual._id.toString() &&
    usuarioActual.role !== "admin"
  ) {
    throw { status: 403, message: "No tienes permisos para actualizar esta tarea" };
  }

  if (titulo !== undefined) tarea.titulo = titulo;
  if (descripcion !== undefined) tarea.descripcion = descripcion;
  if (estado !== undefined) tarea.estado = estado;
  if (prioridad !== undefined) tarea.prioridad = prioridad;

  await tarea.save();
  return tarea;
}

async function eliminarTarea(id, usuarioActual) {
  const tarea = await Tarea.findById(id);

  if (!tarea) {
    throw { status: 404, message: "Tarea no encontrada" };
  }

  if (
    tarea.usuario.toString() !== usuarioActual._id.toString() &&
    usuarioActual.role !== "admin"
  ) {
    throw { status: 403, message: "No tienes permisos para eliminar esta tarea" };
  }

  await tarea.deleteOne();
}

module.exports = {listarTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea,};