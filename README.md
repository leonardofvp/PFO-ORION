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
- [x] **Reglas de Negocio Complejas (Borrado Lógico):** Las obras, gastos, usuarios, subcontratistas y pedidos no se borran físicamente de la base de datos. Se les cambia el estado a "eliminado" para conservar el historial operativo y contable. El sistema también bloquea el inicio de sesión a los usuarios que tengan este estado.
- [x] **Manejo Local de Errores y Flujo HTTP:** Implementación de bloques try-catch directamente en los controladores para capturar excepciones y fallos de base de datos. El sistema responde con códigos de estado HTTP semánticos (como 404 para datos incorrectos) y gestiona la navegación mediante redirecciones seguras (código 303) tras guardar datos, evitando el reenvío duplicado de formularios.

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
│   ├── subcontratistasController.js
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
│   ├── Subcontratista.js
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
│   ├── subcontratistasRoutes.js
│   └── usuariosRoutes.js
├── utils/
│   ├── jsonHelper.js
│   └── roles.js
└── views/
    ├── asignar-personal.pug
    ├── asignar-subcontratista.pug
    ├── detalle-gasto.pug
    ├── detalle-obra.pug
    ├── detalle-pedido.pug
    ├── detalle-subcontratista.pug
    ├── detalle-usuario.pug
    ├── formulario-gasto.pug
    ├── formulario-login.pug
    ├── formulario-obra.pug
    ├── formulario-pedido.pug
    ├── formulario-subcontratista.pug
    ├── formulario-usuario.pug
    ├── gastos.pug
    ├── index.pug
    ├── layout.pug
    ├── obras.pug
    ├── pedidos.pug
    ├── subcontratistas.pug
    └── usuarios.pug