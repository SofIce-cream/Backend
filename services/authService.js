const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

async function registrar({ nombre, email, password, rol }) {
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente)
    throw { status: 400, message: "El email ya está registrado" };
  const usuario = new Usuario({ nombre, email, password , rol});
  
  await usuario.save();
  const token = generarToken(usuario);

  const usuarioObj = usuario.toObject();
  delete usuarioObj.password;

  return { usuario, token };
};

async function login({ email, password }) {
  const usuario = await Usuario.findOne({ email }).select("+password");
  if (!usuario)
    throw { status: 401, message: "El email es incorrecto o no existe" };

  const passwordValida = await usuario.compararPasswords(password);
  if (!passwordValida)
    throw { status: 401, message: "La contraseña es incorrecta" };

  const token = generarToken(usuario);

  const usuarioObj = usuario.toObject();
  delete usuarioObj.password;

  return { usuario, token };
}

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      role: usuario.role,
    },
    process.env.JWT_SECRET || "7d",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}
module.exports = { registrar, login, generarToken };

// CORS
// Cross-Origin Resource Sharing
//  const cors = require("cors");
// app.use(cors());