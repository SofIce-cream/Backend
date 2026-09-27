const axios = require("axios");

async function obtenerTriviaAxios(cantidad = 5, tipo = "multiple") {
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: { amount: cantidad, type: tipo },
      timeout: 5000,
    });

    return response.data.results.map((q, i) => ({
      id: i + 1,
      pregunta: q.question,
      opciones: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5,
      ),
      categoria: q.category,
      dificultad: q.difficulty,
    }));
  } catch (e) {
    throw { status: 500, message: "Error al consultar la API externa" };
  }
}

module.exports = { obtenerTriviaAxios };