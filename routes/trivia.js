const express = require("express");
const router = express.Router();
const triviaController = require("../controllers/triviaController");
// const {autenticar}
const router = express.Router();

router.get("/", triviaController.obtenerTrivia);

module.exports = router;
