# Proyecto Web Equipo Orión - TP2 Desarrollo de Sistemas Web (Back End) - Sistema de Gestión de Obras y Gastos para la empresa Cimientos Sólidos S.A.

Este proyecto corresponde al **Trabajo Práctico N° 2** de la materia **Desarrollo de Sistemas Web (Back End)**

Para el mismo se realizó una aplicación que consiste en una API REST  desarrollada en **Node.js** y **Express**, que migra la persistencia de datos original basada en archivos estáticos JSON hacia una base de datos NoSQL **MongoDB** gestionada a través de la librería **Mongoose**. El sistema implementa una arquitectura modular profesional, controladores asincrónicos mediante `async/await`, validaciones estrictas y manejo centralizado de errores.

## Repositorio

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
- [x] **Reglas de Negocio Complejas (Borrado Lógico):** - Las obras con gastos asociados no se eliminan, sino que conmutan automáticamente su estado a `"eliminada"`.
  - Los gastos eliminados pasan al estado `"eliminado"`, preservando la trazabilidad financiera e historial contable sin mostrarse en las consultas.
- [x] **Manejo Centralizado de Errores:** Middleware global encargado de capturar excepciones, errores de formato en IDs y fallos de validación, respondiendo siempre con estructuras JSON limpias y códigos de estado HTTP semánticos (200, 201, 400, 404, 500).

## Estructura Organizacional del Proyecto

```text
PFO-ORION/
├── .env
├── .gitignore
├── config/
│   └── db.js
├── controllers/
│   ├── gastosController.js
│   ├── loginController.js
│   ├── obrasController.js
│   ├── pedidosController.js
│   └── usuariosController.js
├── data/
│   ├── gastos.json
│   ├── obras.json
│   ├── pedidos.json
│   └── usuarios.json
├── index.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── Gasto.js
│   ├── Obra.js
│   ├── Pedido.js
│   └── Usuario.js
├── package-lock.json
├── package.json
├── README.md
├── routes/
│   ├── gastosRoutes.js
│   ├── indexRoutes.js
│   ├── loginRoutes.js
│   ├── obrasRoutes.js
│   ├── pedidosRoutes.js
│   └── usuariosRoutes.js
├── utils/
│   ├── jsonHelper.js
│   └── roles.js
└── views/
    ├── asignar-personal.pug
    ├── detalle-gasto.pug
    ├── detalle-obra.pug
    ├── detalle-pedido.pug
    ├── detalle-usuario.pug
    ├── formulario-gasto.pug
    ├── formulario-login.pug
    ├── formulario-obra.pug
    ├── formulario-pedido.pug
    ├── formulario-usuario.pug
    ├── gastos.pug
    ├── index.pug
    ├── layout.pug
    ├── obras.pug
    ├── pedidos.pug
    └── usuarios.pug

