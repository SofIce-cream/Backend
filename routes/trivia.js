const express = require("express");
const triviaController = require("../controllers/triviaController");
const router = express.Router();

router.get("/", triviaController.obtenerTrivia);

module.exports = router;
