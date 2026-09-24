const Tarea = require("../models/Tarea");

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

// GET / tareas
async function getTareas(req, res) {
  const tareas = await Tarea.find();
  return tareas;
}

// GET /tareas/:id
async function getTareaById(id) {
  const tarea = await Tarea.findById(id);
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no fue encontrada" });
  }
  return tarea;
}

// ...
module.exports = {
  getTareas,
  getTareaById,
};
