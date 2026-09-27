# 📋 TaskFlow API - Backend RESTful

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-v4-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)
![JWT](https://img.shields.io/badge/Auth-JWT-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB / Mongoose** para la gestión centralizada de usuarios y tareas (**TaskFlow**). Incorpora autenticación por tokens JWT, control de acceso basado en roles (RBAC), validaciones con `express-validator`, manejo global de errores y documentación interactiva con Swagger UI.

---

## 🌐 API Desplegada en Producción
- **URL Base:** https://backend-sk85.onrender.com
- **Documentación Swagger:** https://backend-sk85.onrender.com/api-docs

---

## 📐 Arquitectura del Proyecto

El proyecto sigue el patrón de **arquitectura en capas (Layered Architecture)** para garantizar una separación clara de responsabilidades y un código mantenible:

```text
taskflow-mini-back/
├── config/             # Configuración y conexión a la base de datos (db.js)
├── controllers/        # Controladores (Manejo de peticiones HTTP y respuestas)
├── middleware/         # Middlewares (Autenticación JWT, Roles, Validaciones, Errores)
├── models/             # Esquemas de Mongoose con validaciones
├── routes/             # Definición de rutas y endpoints de la API
├── services/           # Lógica de negocio desacoplada de la capa HTTP
├── utils/              # Utilidades auxiliares (Manejo de asincronía, helpers)
├── .env.example        # Plantilla con variables de entorno requeridas
├── .gitignore          # Archivos excluidos de control de versiones
├── app.js              # Configuración global y middlewares de Express
├── index.js            # Punto de entrada y arranque del servidor
└── package.json        # Dependencias y scripts del proyecto
