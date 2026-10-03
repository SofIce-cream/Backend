const express = require("express");
const rankingController = require("../controllers/rankingController");
const { autenticar } = require("../middleware/auth");

const router = express.Router();

router.get("/", autenticar, rankingController.obtenerRankings);

module.exports = router;