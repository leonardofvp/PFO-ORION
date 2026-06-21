import { body } from "express-validator";

const validarObra = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la obra es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres."),

  body("ubicacion")
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria."),

  body("presupuesto")
    .notEmpty()
    .withMessage("El presupuesto inicial es obligatorio.")
    .isFloat({ min: 0 })
    .withMessage(
      "El presupuesto debe ser un número válido y no puede ser negativo.",
    ),

  body("estado")
    .notEmpty()
    .withMessage("El estado de la obra es obligatorio.")
    .isIn(["activa", "iniciando", "finalizada"])
    .withMessage("Estado no válido."),
];

const validarUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres."),

  body("email")
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .normalizeEmail(),

  body("password")
    .if(
      (value, { req }) => req.method === "POST" || (value && value.length > 0),
    )
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),

  body("rol").notEmpty().withMessage("Debes seleccionar un rol."),
];

const validarSubcontratista = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre o razón social es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres."),

  body("cuit")
    .trim()
    .notEmpty()
    .withMessage("El CUIT es obligatorio.")
    .customSanitizer((value) => value.replace(/[-\s]/g, ""))
    .matches(/^\d{11}$/)
    .withMessage("El CUIT debe contener exactamente 11 números."),

  body("especialidad")
    .trim()
    .notEmpty()
    .withMessage("La especialidad es obligatoria."),

  body("telefono").trim().notEmpty().withMessage("El teléfono es obligatorio."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .normalizeEmail(),
];

const validarPedido = [
  body("idObra")
    .notEmpty()
    .withMessage("Debe seleccionar una obra.")
    .isMongoId()
    .withMessage("El identificador de la obra no es válido."),

  body("tipo")
    .notEmpty()
    .withMessage("El tipo de pedido es obligatorio.")
    .isIn(["material", "servicio"])
    .withMessage("El tipo seleccionado no es válido."),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ min: 3 })
    .withMessage("La descripción debe tener al menos 3 caracteres."),

  body("cantidad")
    .notEmpty()
    .withMessage("La cantidad es obligatoria.")
    .isFloat({ min: 0.01 })
    .withMessage("La cantidad debe ser un número mayor a cero."),

  body("unidad")
    .trim()
    .notEmpty()
    .withMessage("La unidad de medida es obligatoria."),

  body("estado")
    .notEmpty()
    .withMessage("El estado del pedido es obligatorio.")
    .isIn(["pendiente", "aprobado", "entregado"])
    .withMessage("El estado seleccionado no es válido."),

  body("observaciones").optional({ checkFalsy: true }).trim(),
];

const validarGasto = [
  body("idObra")
    .notEmpty()
    .withMessage("Debe seleccionar a qué obra pertenece el gasto.")
    .isMongoId()
    .withMessage("El identificador de la obra no es válido."),

  body("monto")
    .notEmpty()
    .withMessage("El monto del gasto es obligatorio.")
    .isFloat({ min: 0.01 })
    .withMessage("El monto debe ser un número mayor a cero."),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ min: 3 })
    .withMessage("La descripción debe tener al menos 3 caracteres."),

  body("estado")
    .notEmpty()
    .withMessage("El estado del gasto es obligatorio.")
    .isIn(["pendiente", "pagado", "rechazado"])
    .withMessage("El estado seleccionado no es válido."),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha del gasto es obligatoria.")
    .isISO8601()
    .withMessage("El formato de la fecha no es válido."),
];

const validarCertificacion = [
  body("idObra")
    .notEmpty()
    .withMessage("Debe seleccionar una obra")
    .isMongoId()
    .withMessage("ID de obra inválido"),

  body("idSubcontratista")
    .notEmpty()
    .withMessage("Debe seleccionar un subcontratista")
    .isMongoId()
    .withMessage("ID de subcontratista inválido"),

  body("tareaRealizada")
    .trim()
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria")
    .isLength({ min: 5 })
    .withMessage("La descripción debe tener al menos 5 caracteres"),

  body("porcentajeAvance")
    .notEmpty()
    .withMessage("El porcentaje es obligatorio")
    .isInt({ min: 1, max: 100 })
    .withMessage("El avance debe ser un número entre 1 y 100"),
];

export {
  validarObra,
  validarUsuario,
  validarSubcontratista,
  validarPedido,
  validarGasto,
  validarCertificacion,
};
