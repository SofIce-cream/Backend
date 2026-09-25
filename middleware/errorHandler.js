function errorHandler(err, req, res, next) {
  console.error("Error:", err.messasge || err);

  const statuscode = err.status || err.statusCode || 500;
  let mensaje = err.mensaje || "Error interno del servidor, intente más tarde";

  if (err.name == "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ errors: "ID inválido en la db" });
  }

  if(err.code === 11000){
    return res.status(400).json({error: "El correo o dato ya existe en la base de datos"});
  }

  return res
    .status(500)
    .json({ error: "Error interno del servidor, intente más tarde" });
}

module.exports = errorHandler;
