const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const authRouter = require("./routes/auth");
const tareasRouter = require("./routes/tareas");
const triviaRouter = require("./routes/trivia");
const usuariosRouter = require("./routes/usuarios");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para parsear el body de las peticiones

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "API Restful para gestión de tareas con roles y autenticación JWT",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local Host",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "API DE TAREAS",
    version: "1.0.0",
    documentacion: "/api-docs",
    endpoints: {
      auth: "/api/auth",
      tareas: "/api/tareas",
      trivia: "/api/trivia",
      usuarios: "/api/usuarios",
    },
  });
});

app.use("/api/tareas", tareasRouter);
app.use("/api/auth", authRouter);
app.use("/api/trivia", triviaRouter);
app.use("/api/usuarios", usuariosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada, petición no existe" });
});

app.use(errorHandler);

module.exports = app;