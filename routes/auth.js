const express = require("express");
const authControllers = require("../controllers/authControllers");
const { validarRegistro, validarLogin } = require("../middleware/validators");

const router = express.Router();

router.post("/registrar", validarRegistro, authControllers.registrar);
router.post("/login", validarLogin, authControllers.login);

module.exports = router;