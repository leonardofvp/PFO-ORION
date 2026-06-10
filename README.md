# Proyecto Web Equipo Orión - TP2 Desarrollo de Sistemas Web (Back End) - Sistema de Gestión de Obras y Gastos para la empresa Cimientos Sólidos S.A.

# Integrantes — Equipo Orión

- Carolina Corradi
- Manuel Espíndola
- Leandro Ferrero
- Gabriela Gonzalez
- Leonardo Vargas

# Materia
Desarrollo de Sistemas Web (Back End) Trabajo Práctico N.º 2

# Licencia
Proyecto académico realizado con fines educativos.

# Requerimientos del Trabajo Práctico Cumplidos

- [x] **Arquitectura Modular y Organizada:** Estructuración del proyecto separando responsabilidades en carpetas específicas (`models`, `controllers`, `routes`, `middlewares`, `config`).
- [x] **Persistencia NoSQL:** Integración completa de **MongoDB** mediante **Mongoose** con validaciones nativas de esquemas.
- [x] **Controladores Asincrónicos:** Implementación de la lógica de negocio utilizando sintaxis de programación asincrónica `async/await`.
- [x] **Integridad Referencial:** Validación estricta para asegurar que todo gasto esté asociado obligatoriamente a una obra existente y activa.
- [x] **Reglas de Negocio Complejas (Borrado Lógico):** Las obras, gastos, usuarios, subcontratistas y pedidos no se borran físicamente de la base de datos. Se les cambia el estado a "eliminado" para conservar el historial operativo y contable. El sistema también bloquea el inicio de sesión a los usuarios que tengan este estado.
- [x] **Manejo Local de Errores y Flujo HTTP:** Implementación de bloques try-catch directamente en los controladores para capturar excepciones y fallos de base de datos. El sistema responde con códigos de estado HTTP semánticos (como 404 para datos incorrectos) y gestiona la navegación mediante redirecciones seguras (código 303) tras guardar datos, evitando el reenvío duplicado de formularios.

# Repositorio
🔗 https://github.com/leonardofvp/PFO-ORION.git

# Descripción

Este proyecto corresponde al Trabajo Práctico N.º 2 de la materia Desarrollo de Sistemas Web (Back End).

La aplicación consiste en un sistema web orientado a la gestión administrativa y operativa de obras para la empresa ficticia Cimientos Sólidos S.A.

# El sistema fue desarrollado utilizando:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Pug
- Arquitectura modular MVC

La solución migra la persistencia original basada en archivos JSON hacia una base de datos NoSQL MongoDB, implementando validaciones robustas, relaciones entre entidades, controladores asincrónicos y manejo estructurado de errores.

# Funcionalidades Principales:

- Gestión de Obras:
    Alta, baja lógica y modificación de obras
    Asignación de personal
    Asociación de subcontratistas
    Gestión de presupuesto y estado
- Gestión de Gastos:
    Registro de gastos asociados a obras
    Control de estados
    Validación de integridad referencial
- Gestión de Pedidos:
    Solicitud de materiales y servicios
    Asociación con usuarios y obras
    Seguimiento de estados del pedido
- Gestión de Subcontratistas:
    Registro y administración de proveedores externos
    Validación de CUIT único
    Especialidades y datos de contacto
-  Gestión de Usuarios:
    Administración de usuarios del sistema
    Roles organizacionales
    Borrado lógico de usuarios
- Login Básico:
    Inicio de sesión simple
    Control de acceso inicial

# Reglas de Negocio Implementadas
- Borrado lógico de entidades
- Validación estricta de datos mediante Mongoose
- Relación obligatoria entre gastos/pedidos y obras
- Restricción de roles válidos
- Estados controlados mediante enums
- Manejo centralizado de errores
- Arquitectura desacoplada y modular


# Arquitectura del Proyecto
El sistema implementa una arquitectura basada en separación de responsabilidades:
- controllers/   → Lógica de negocio
- models/        → Modelos Mongoose
- routes/        → Endpoints y navegación
- views/         → Plantillas Pug
- config/        → Configuración general
- middlewares/   → Middlewares personalizados
- utils/         → Utilidades y constantes

# Estructura del Proyecto

PFO-ORION/
- ├── .env
- ├── .gitignore
- ├── config/
- │   └── db.js
- ├── controllers/
- │   ├── gastosController.js
- │   ├── loginController.js
- │   ├── obrasController.js
- │   ├── pedidosController.js
- │   ├── subcontratistasController.js
- │   └── usuariosController.js
- ├── data/
- │   ├── gastos.json
- │   ├── obras.json
- │   ├── pedidos.json
- │   └── usuarios.json
- ├── index.js
- ├── middlewares/
- │   └── auth.js
- ├── models/
- │   ├── Gasto.js
- │   ├── Obra.js
- │   ├── Pedido.js
- │   ├── Subcontratista.js
- │   └── Usuario.js
- ├── package-lock.json
- ├── package.json
- ├── README.md
- ├── routes/
- │   ├── gastosRoutes.js
- │   ├── indexRoutes.js
- │   ├── loginRoutes.js
- │   ├── obrasRoutes.js
- │   ├── pedidosRoutes.js
- │   ├── subcontratistasRoutes.js
- │   └── usuariosRoutes.js
- ├── utils/
- │   ├── jsonHelper.js
- │   └── roles.js
- └── views/
-    ├── asignar-personal.pug
-    ├── asignar-subcontratista.pug
-    ├── detalle-gasto.pug
-    ├── detalle-obra.pug
-    ├── detalle-pedido.pug
-    ├── detalle-subcontratista.pug
-    ├── detalle-usuario.pug
-    ├── formulario-gasto.pug
-    ├── formulario-login.pug
-    ├── formulario-obra.pug
-    ├── formulario-pedido.pug
-    ├── formulario-subcontratista.pug
-    ├── formulario-usuario.pug
-    ├── gastos.pug
-    ├── index.pug
-    ├── layout.pug
-    ├── obras.pug
-    ├── pedidos.pug
-    ├── subcontratistas.pug
-    └── usuarios.pug

 # Modelado de Datos
Obra
-   Nombre
-    Ubicación
-    Presupuesto
-    Estado
-    Personal asignado
-    Subcontratistas asociados

Gasto
-    Obra asociada
-    Descripción
-    Monto
-    Estado
-    Fecha

Pedido
-    Obra asociada
-    Usuario solicitante
-    Tipo de pedido
-    Cantidad
-    Unidad
-    Estado
-    Observaciones

Subcontratista
-    Nombre/Razón social
-    CUIT
-    Especialidad
-    Contacto
-    Estado
-
Usuario
-    Nombre y apellido
-    Email único
-    Contraseña
-    Rol
-    Estado


# Instalación y Ejecución

  1. Clonar el repositorio
-git clone https://github.com/leonardofvp/PFO-ORION.git

 2. Instalar dependencias
-npm install

 3. Ejecutar el proyecto
-npm run dev

 4. Abrir en el navegador
-http://localhost:3000

# Rutas Principales

Ruta	             Descripción
- /	                Página principal
- /login          	Inicio de sesión
- /obras	            Gestión de obras
- /gastos          	Gestión de gastos
- /pedidos    	    Gestión de pedidos
- /usuarios	        Gestión de usuarios
- /subcontratistas	Gestión de subcontratistas
