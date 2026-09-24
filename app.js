const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
const tareasRouter = require("./routes/tareas");
const triviaRouter = require("./routes/trivia");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para parsear el body de las peticiones

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "API DE TAREAS",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      tareas: "/api/tareas",
    },
  });
});

app.use("/api/tareas", tareasRouter);
app.use("/api/auth", authRouter);
app.use("/api/trivia", triviaRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada, petición no existe" });
});

app.use(errorHandler);

module.exports = app;
