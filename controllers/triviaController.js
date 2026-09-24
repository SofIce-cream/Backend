const triviaService = require("../services/externalService");
const asyncHandler = require("../utils/asyncHandler");

const obtenerTrivia = asyncHandle(async (req, res) => {
  const cantidad = parseInt(req.query.cantidad) || 5;
  const tipo = req.query.tipo || "multiple";

  if ((cantidad < 1) | (cantidad > 20)) {
    throw {
      status: 400,
      message: "La cantidad debe estar entre 1 y 20 preguntas",
    };
  }
  const preguntas = await triviaService.obtenerTriviaAxios(cantidad, tipo);
  res.json({ total: preguntas.length, preguntas });
});

module.exports = { obtenerTrivia };
