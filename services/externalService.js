// Fecth nativo JjS
async function obtenerTrivia() {
  const response = await fetch("https://opentdb.com/api.php?amount=5");
  if (!response.ok) {
    throw { status: 500, message: "No se pudo hacer la petición externa" };
  }
  const data = await response.json();
  return data.results;
}

// AXIOS

const axios = require("axios");

async function obtenerTriviaAxios(cantidad = 5, tipo = "multiple") {
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: { amount: cantidad, type: tipo },
      timetout: 5000,
    });

    return response.data.results.map((q, i) => ({
      id: i + 1,
      pregunta: q.question,
      opciones: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5,
      ),
      categoria: q.category,
      dificultad: q.dificulty,
    }));
  } catch (e) {
    throw { status: 500, message: "Error al consultar la API externa" };
  }
}

module.exports = { obtenerTriviaAxios };
