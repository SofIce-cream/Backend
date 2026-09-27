const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede tener más de 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    estado: {
      type: String,
      enum:{
        values:['pendiente', 'en_progreso', 'completada'],
        message: 'El estado {VALUE} no es válido',
      },
      default: 'pendiente',
    },
    prioridad: {
      type: String,
      enum: {
        values: ["baja", "media", "alta"],
        message: "La prioridad debe ser baja o media o alta",
      },
      default: "media",
    },
    usuario:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'La tarea debe estar vinculada a un usuario'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tarea", tareaSchema);