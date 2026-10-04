# 🕵️ AlibiForge API - Backend RESTful

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-v5-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)
![JWT](https://img.shields.io/badge/Auth-JWT-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB / Mongoose** para **AlibiForge**, un sistema de fabricación y validación colaborativa de coartadas. Los usuarios crean alibis, se suman como testigos en la *Alibi Chain*, votan la credibilidad/creatividad/consistencia de otros, y pueden marcar coartadas como falsas. Incorpora autenticación por tokens JWT, control de acceso basado en roles (RBAC), validaciones con `express-validator`, manejo global de errores y documentación interactiva con Swagger UI.

---

## 🌐 API Desplegada en Producción
- **URL Base:** https://TU-APP.onrender.com
- **Documentación Swagger:** https://TU-APP.onrender.com/api-docs

> Reemplaza la URL de arriba por la que te asigne Render al desplegar.

---

## 📐 Arquitectura del Proyecto

El proyecto sigue el patrón de **arquitectura en capas (Layered Architecture)** para garantizar una separación clara de responsabilidades y un código mantenible:

```text
Backend/
├── config/             # Configuración y conexión a MongoDB (db.js)
├── controllers/        # Controladores (manejo de peticiones HTTP)
│   ├── authControllers.js
│   ├── coartadaController.js
│   └── rankingController.js
├── middleware/         # Middlewares (JWT, roles, validaciones, errorHandler)
├── models/             # Esquemas de Mongoose con validaciones
│   ├── Usuario.js      # alias, password, especialidad, credibilidad, bloqueadoHasta, role
│   └── Coartada.js     # titulo, situacion, historia, detalles, testigos, votos, marcasFalsas
├── routes/              # Definición de rutas y endpoints
├── services/             # Lógica de negocio desacoplada de la capa HTTP
│   ├── authService.js
│   ├── usuarioService.js     # credibilidad y bloqueo de usuarios
│   ├── coartadaService.js    # CRUD, Alibi Chain, votos, marcar falsa
│   └── rankingService.js     # Master of Deceit, Most Creative, etc.
├── utils/               # Utilidades auxiliares (asyncHandler)
├── .env.example         # Plantilla de variables de entorno requeridas
├── .gitignore           # Exclusión de archivos sensibles (node_modules, .env)
├── app.js               # Configuración global, middlewares y Swagger UI
├── index.js             # Punto de entrada y arranque del servidor
└── package.json         # Dependencias y scripts del proyecto
```

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** Node.js (v18+)
- **Framework Web:** Express.js
- **Base de Datos:** MongoDB Atlas & Mongoose ORM
- **Seguridad:** JSON Web Tokens (JWT) & BcryptJS
- **Validaciones:** express-validator
- **Documentación:** Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/SofIce-cream/Backend
cd Backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Define los valores en tu archivo `.env`:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/alibiforge?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

### 4. Iniciar el servidor
```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

---

## 🔑 Endpoints de la API

### 🛡️ Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/registrar` | Registrar un nuevo usuario (alias, password, especialidad) | Público |
| `POST` | `/api/auth/login` | Iniciar sesión y obtener token JWT | Público |

### 👤 Usuarios (`/api/usuarios`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios/me` | Ver el propio perfil (alias, especialidad, credibilidad, bloqueo) | Autenticado |
| `GET` | `/api/usuarios` | Listar todos los usuarios | Admin |
| `PUT` | `/api/usuarios/:id/rol` | Cambiar el rol de un usuario | Admin |
| `DELETE` | `/api/usuarios/:id` | Eliminar un usuario | Admin |

### 🗂️ Coartadas (`/api/coartadas`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/coartadas` | Listar todas las coartadas | Autenticado |
| `GET` | `/api/coartadas/:id` | Obtener detalle de una coartada por ID | Autenticado |
| `POST` | `/api/coartadas` | Crear una nueva coartada (mínimo 3 detalles) | Autenticado |
| `PUT` | `/api/coartadas/:id` | Actualizar una coartada existente | Propietario / Admin |
| `DELETE` | `/api/coartadas/:id` | Eliminar una coartada | Propietario / Admin |
| `POST` | `/api/coartadas/:id/testigo` | Unirse como testigo a la Alibi Chain | Autenticado |
| `DELETE` | `/api/coartadas/:id/testigo` | Desertar de la Alibi Chain (penaliza credibilidad) | Autenticado |
| `POST` | `/api/coartadas/:id/votar` | Votar credibilidad, creatividad y consistencia (1-5) | Autenticado |
| `POST` | `/api/coartadas/:id/marcar-falsa` | Marcar una coartada como falsa | Autenticado |
| `GET` | `/api/coartadas/:id/indice` | Calcular el índice de credibilidad de una coartada | Autenticado |

### 🏆 Rankings (`/api/rankings`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rankings` | Obtener los 4 rankings: Master of Deceit, Most Creative, Most Consistent, Most Wanted | Autenticado |

---

## 🎮 Lógica de negocio

- **Índice de credibilidad:** combina el promedio de votos (credibilidad/creatividad/consistencia), los puntos por cantidad de testigos (+2 c/u), y un bonus por complejidad según el número de detalles (0, 5, 10 o 20 puntos).
- **Deserción de la Alibi Chain:** si un testigo abandona, tanto el autor como los testigos restantes pierden 5 puntos de credibilidad.
- **Exposición de coartadas falsas:** al reunir 3 marcas de "falsa", la coartada se expone, pasa a estado `Rejected` y su autor pierde 10 puntos de credibilidad (una sola vez).
- **Bloqueo por baja credibilidad:** si la credibilidad de un usuario cae por debajo de 0, queda bloqueado para crear nuevas coartadas durante 7 días.

---

## 📖 Documentación Interactiva (Swagger UI)

La especificación completa OpenAPI 3.0 con soporte interactivo para probar endpoints (`Try it out`) y autenticación Bearer Token se encuentra disponible en:

👉 **https://TU-APP.onrender.com/api-docs**

---

## 👥 Autoría

Proyecto 4 - Ingeniería Web
- Backend adaptado sobre la base del proyecto TaskFlow, para servir como API de **AlibiForge**

---

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.
