const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "El campo de texto es obligatorio"],
      trim: true,
      minlength: [5, "El texto debe ser una oración válida"],
      maxlenth: [200, "El texto no puede contener más de 200 caracteres"],
      trim: true,
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
        message: 'El estadp {VALUE} no es válido',
      },
      default: 'pendiente',
    },
    prioridad: {
      type: String,
      enum: {
        values: ["baja", "media", "alta"],
        message: "La prioridad debe ser baja o media o alta",
      },
    },
    usuario:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'La tarea debe estar vinculada a un usuario'],
    },
  },
  { timestamps: true }, // createdAt y updatedAt
);

module.exports = mongoose.model("Tarea", tareaSchema);
