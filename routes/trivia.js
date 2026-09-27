const express = require("express");
const triviaController = require("../controllers/triviaController");
//const {autenticar}

const router = express.Router();

router.get("/", triviaController.obtenerTrivia);

module.exports = router;
