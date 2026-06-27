# Proyecto Web Equipo Orión - TP2 Desarrollo de Sistemas Web (Back End) - Sistema de Gestión de Obras y Gastos para la empresa Cimientos Sólidos S.A.

# Integrantes — Equipo Orión

- Carolina Corradi
- Manuel Espíndola
- Leandro Ferrero
- Gabriela Gonzalez
- Leonardo Vargas

# Materia

Desarrollo de Sistemas Web (Back End) Trabajo Práctico N.º 3

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

Este proyecto corresponde al Trabajo Práctico N.º 3 de la materia Desarrollo de Sistemas Web (Back End).

La aplicación consiste en un sistema web orientado a la gestión administrativa y operativa de obras para la empresa ficticia Cimientos Sólidos S.A.

## Stack Tecnológico

**Backend (Entorno Node.js):**
- **Express.js:** Framework para enrutamiento y arquitectura del servidor.
- **MongoDB Atlas & Mongoose:** Base de datos en la nube y ODM para modelado estricto.
- **JWT (JSON Web Token) & Cookie-parser:** Autenticación de usuarios y manejo seguro de sesiones.
- **Express-Validator:** Validación de datos de entrada en las peticiones HTTP.
- **Socket.io:** WebSockets para comunicación bidireccional en tiempo real (Chat Institucional).
- **Jest, Supertest & mongodb-memory-server:** Suite de testing automatizado de integración.

**Frontend (Renderizado del lado del servidor):**
- **Pug:** Motor de plantillas dinámico.
- **Bootstrap:** Framework CSS para diseño responsivo (Mobile First).
- **SweetAlert2:** Librería para notificaciones y alertas no bloqueantes.

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
- Gestión de Usuarios:
  Administración de usuarios del sistema
  Roles organizacionales
  Borrado lógico de usuarios
- Gestión de Certificados de Avance:
  Registro de avances físicos en el terreno
  Vinculación con la obra correspondiente y el subcontratista asignado
  Control del porcentaje de hito cumplido para su futura auditoría financiera
  Borrado lógico de certificados
- Chat Institucional:
  Mensajería bidireccional en tiempo real utilizando WebSockets (Socket.io)[cite: 1]
  Comunicación directa entre los distintos perfiles del sistema (ej. Administración y Capataces)[cite: 1]
  Trazabilidad y centralización técnica de las consultas operativas[cite: 1]
- Login Básico:
  Inisio de sesión
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

El sistema implementa una arquitectura basada en separación de responsabilidades (MVC) y validación continua:

- `config/`        → Configuración general y conexión a la base de datos (MongoDB).
- `controllers/`   → Lógica de negocio y manejo de errores asincrónicos.
- `middlewares/`   → Middlewares personalizados (autenticación, roles, validación, manejo de errores).
- `models/`        → Esquemas de validación y modelado de Mongoose.
- `public/`        → Archivos estáticos del Frontend (imágenes y scripts del cliente).
- `routes/`        → Definición de endpoints HTTP y navegación.
- `sockets/`       → Lógica y configuración de WebSockets (Socket.io) para mensajería en tiempo real.
- `utils/`         → Utilidades generales, constantes de roles y helpers.
- `views/`         → Plantillas dinámicas renderizadas por Pug.
- `__tests__/`     → Suite de pruebas de integración automatizadas (Jest).
- `test-utils/`    → Constructores (builders) y configuración del entorno de pruebas.

# Estructura del Proyecto

```
PFO-ORION/
├── __tests__/
│   ├── gastos.test.js
│   ├── login.test.js
│   ├── obras.test.js
│   ├── pedidos.test.js
│   ├── subcontratistas.test.js
│   └── usuarios.test.js
├── .gitignore
├── app.js
├── config/
│   └── db.js
├── controllers/
│   ├── certificacionesAvanceController.js
│   ├── chatInstitucionalController.js
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
│   ├── autenticacionMiddleware.js
│   ├── autorizacionMiddleware.js
│   ├── errorMiddleware.js
│   └── validacionMiddleware.js
├── models/
│   ├── CertificacionAvance.js
│   ├── Gasto.js
│   ├── Obra.js
│   ├── Pedido.js
│   ├── Subcontratista.js
│   └── Usuario.js
├── package-lock.json
├── package.json
├── public/
│   ├── img/
│   │   └── favicon.svg
│   └── js/
│       ├── chatInstitucional.js
│       └── confirmar.js
├── README.md
├── routes/
│   ├── certificacionesAvaceRoutes.js
│   ├── chatInstitucionalRoutes.js
│   ├── gastosRoutes.js
│   ├── indexRoutes.js
│   ├── loginRoutes.js
│   ├── obrasRoutes.js
│   ├── pedidosRoutes.js
│   ├── subcontratistasRoutes.js
│   └── usuariosRoutes.js
├── sockets/
│   └── chatInstitucional.js
├── test-utils/
│   ├── builders/
│   │   ├── gastoBuilder.js
│   │   ├── obraBuilder.js
│   │   ├── pedidoBuilder.js
│   │   ├── subcontratistaBuilder.js
│   │   └── usuarioBuilder.js
│   └── setup-jest.js
├── utils/
│   ├── jsonHelper.js
│   └── roles.js
├── vecel.json
└── views/
    ├── alertas-validacion.pug
    ├── asignar-personal.pug
    ├── asignar-subcontratista.pug
    ├── certificaciones-avance.pug
    ├── chat-institucional.pug
    ├── detalle-certificacion-avance.pug
    ├── detalle-gasto.pug
    ├── detalle-obra.pug
    ├── detalle-pedido.pug
    ├── detalle-subcontratista.pug
    ├── detalle-usuario.pug
    ├── error.pug
    ├── formulario-certificacion-avance.pug
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
```

# Modelado de Datos

Obra

- Nombre
- Ubicación
- Presupuesto
- Estado
- Personal asignado
- Subcontratistas asociados

Gasto

- Obra asociada
- Descripción
- Monto
- Estado
- Fecha

Pedido

- Obra asociada
- Usuario solicitante
- Tipo de pedido
- Cantidad
- Unidad
- Estado
- Observaciones

Subcontratista

- Nombre/Razón social
- CUIT
- Especialidad
- Contacto
- Estado
- Usuario
- Nombre y apellido
- Email único
- Contraseña
- Rol
- Estado

Certificaciones de avance

- Obra asociada
- Subcontratista asociado
- Tarea realizada
- Porcentaje da avance

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

Ruta Descripción

- / Página principal
- /login Inicio de sesión
- /obras Gestión de obras
- /gastos Gestión de gastos
- /pedidos Gestión de pedidos
- /usuarios Gestión de usuarios
- /subcontratistas Gestión de subcontratistas
  /certificacionesAvance Gestión de certificaciones de avance
