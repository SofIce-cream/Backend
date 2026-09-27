const Usuario = require("../models/Usuario");

async function listarUsuarios() {
  return await Usuario.find();
}

async function cambiarRol(id, role) {
  const usuario = await Usuario.findById(id);
  if (!usuario) throw { status: 404, message: "Usuario no encontrado" };
  usuario.role = role;
  await usuario.save();
  return usuario;
}

async function eliminarUsuario(id) {
  const usuario = await Usuario.findById(id);
  if (!usuario) throw { status: 404, message: "Usuario no encontrado" };
  await usuario.deleteOne();
}

module.exports = { listarUsuarios, cambiarRol, eliminarUsuario };