const authService = require("../services/authService");
const asyncHandler = require("express-async-handler");

const registrar = asyncHandler(async (req, res) => {
  const { usuario, token } = await authService.registrar(req.body);
  res
    .status(201)
    .json({ mensaje: "Usuario registrado correctamente", usuario, token });
});
module.exports = { registrar };
