# Proyecto Web Equipo Orión - TP2 Desarrollo de Sistemas Web (Back End)

 # Sistema de Gestión de Obras y Gastos - Empresa de Desarrollo Orión para Cimientos Sólidos S.A.

Este proyecto corresponde al **Trabajo Práctico N° 2** de la materia **Desarrollo de Sistemas Web (Back End)** 

Para el mismo se realizó una aplicación que consiste en una API REST  desarrollada en **Node.js** y **Express**, que migra la persistencia de datos original basada en archivos estáticos JSON hacia una base de datos NoSQL **MongoDB** gestionada a través de la librería **Mongoose**. El sistema implementa una arquitectura modular profesional, controladores asincrónicos mediante `async/await`, validaciones estrictas y manejo centralizado de errores.

## Repositorio y enlace al Proyecto Desplegado

- [x] Repositorio en GitHub creado

## Integrantes del Equipo Orión

- [x] **Carolina Corradi** 
- [x] **Manuel Espíndola** 
- [x] **Leandro Ferrero** 
- [x] **Gabriela Gonzalez**
- [x] **Leonardo Vargas** 


## Requerimientos del Trabajo Práctico Cumplidos

- [x] **Arquitectura Modular y Organizada:** Estructuración del proyecto separando responsabilidades en carpetas específicas (`models`, `controllers`, `routes`, `middlewares`, `config`).
- [x] **Persistencia NoSQL:** Integración completa de **MongoDB** mediante **Mongoose** con validaciones nativas de esquemas.
- [x] **Controladores Asincrónicos:** Implementación de la lógica de negocio utilizando sintaxis de programación asincrónica `async/await`.
- [x] **Integridad Referencial:** Validación estricta para asegurar que todo gasto esté asociado obligatoriamente a una obra existente y activa.
- [x] **Reglas de Negocio Complejas (Borrado Lógico):** - Las obras con gastos asociados no se eliminan, sino que conmutan automáticamente su estado a `"Detenida"`.
  - Los gastos eliminados pasan al estado `"eliminado"`, preservando la trazabilidad financiera e historial contable sin mostrarse en las consultas.
- [x] **Manejo Centralizado de Errores:** Middleware global encargado de capturar excepciones, errores de formato en IDs y fallos de validación, respondiendo siempre con estructuras JSON limpias y códigos de estado HTTP semánticos (200, 201, 400, 404, 500).

## Estructura Organizacional del Proyecto

```text
PFO-ORION/
│
├── config/
│   └── db.js              # Configuración y ciclo de conexión asincrónica a    MongoDB
│
├── models/                # Capa de Datos: Esquemas y Modelos de Mongoose
│   ├── Obra.js            # Modelo de Obras (Campos de control y estado)
│   └── Gasto.js           # Modelo de Gastos (Estructura financiera y referencia cruzada)
│
├── controllers/           # Capa de Lógica de Negocio (Manejo asincrónico del CRUD)
│   ├── obraController.js  # Lógica operativa del módulo Obras y validaciones asociadas
│   └── gastoController.js # Lógica operativa del módulo Gastos y reglas de borrado lógico
│
├── routes/                # Capa de Ruteo: Mapeo de Endpoints de la API
│   ├── obraRoutes.js      # Definición de rutas HTTP para /api/obras
│   └── gastoRoutes.js     # Definición de rutas HTTP para /api/gastos
│
├── middlewares/           # Capa de Control y Validación
│   └── errorHandler.js    # Captura global de excepciones y estandarización de respuestas HTTP
│
├── .env.example           # Plantilla de configuración para variables de entorno locales
├── .gitignore             # Archivo de exclusión de control de versiones (para node_modules y .env)
├── package.json           # Dependencias, scripts y metadatos del proyecto
└── server.js              # Punto de entrada de la aplicación Express e inicialización general
