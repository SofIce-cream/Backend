// Que creen que iría en esta parte?
// Todo Estudiante: Crear el controlador de tareas
const Tarea = require("../models/Tarea");
const asyncHandler = requiere("../utils/asyncHandler");

const obtenerTareas  = asyncHandler(async(req, res) => {
    const filtro = req.ususrio.rol === "admin" ? {} : {usuario: req.usuario._id};
    const tareas = await Tarea.find(filtro).populate("usuario", "nombre email");

    res.status(200).json({ok: true, count: tareas.length, tareas});
});

const obtenerTareaPorId = asyncHandler(async (req,res) => {
    const tarea = await Tarea.findById(req.params.id).populate("usuario", "nombre email");

    if(!tarea){
        res.status(404);
        throw new Error("Tarea no econtrada");
    }
    if(tarea.usuario._id.toString() !== req.usuario._id.toString() && req.usuario.rol !== "admin"){
        res.status(403);
        throw new Error("No tienes permisos para consultar esta tarea");
    }
    res.status(200).json({ok: true, tarea});
});

const crearTarea = asyncHandler(async (req, res) => {
    const tarea = await Tarea.create({titulo, descripcion, estado, prioridad, usuario: req.usuario._id,});
    res.status(201).json({ok: true, mensaje: "Tarea creada existosamente", tarea});
});

const actualizarTarea = asyncHandler(async (req, res) => {
    let tarea = await Tarea.findById(req.params.id);

    if(!tarea){
        res.status(404);
        throw new Error("Tarea no encontrada");
    }
    if(tarea.usuario.toString() !== req.usuario._id.toString() && req.usuario.rol != "admin"){
        res.status(403);
        throw new Error("No tienes permisos para modificar esta tarea");
    }
    tarea = await Tarea.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ok: true, mensaje: "Tarea actualizada", tarea});
});

const eliminarTarea = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);

    if(!tarea){
        res.status(404);
        throw new Error("Tarea no encontrada");
    }
    if(tarea.usuario.toString() !== req.usuario._id,toString() && req.usuario.rol !== "admin"){
        res.status(403);
        throw new Error("No tienes permisos para eliminar este tarea");
    }

    await tarea.deleteOne();
    res.status(200).json({ok: true, mensaje:"Tarea eliminada correctamente"});
});

module.exports = {obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea};