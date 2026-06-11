import mongoose from "mongoose";
import dotenv from "dotenv";
import Usuario from "./models/Usuario.js";

dotenv.config();

const seedAdministrator = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "La variable MONGO_URI no está definida en el archivo .env",
      );
    }

    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión establecida para la inicialización de datos.");


    const adminExistente = await Usuario.findOne({ rol: "admin" });

    if (adminExistente) {
      console.log(
        `El usuario administrador ya existe en la base de datos (${adminExistente.email}).`,
      );
      console.log("Proceso de seeding omitido.");
      process.exit(0);
    }

    const emailAdmin = "admin@cimientos.com";
    const passwordPlano = "admin"
    const { salt, passwordHash } = Usuario.crearPasswordSeguro(passwordPlano);

    const nuevoAdmin = new Usuario({
      nombre: "admin",
      apellido: "admin",
      email: emailAdmin,
      passwordHash: passwordHash,
      salt: salt,
      rol: "admin",
      estado: "activo",
    });

    await nuevoAdmin.save();
    console.log("--------------------------------------------------");
    console.log("¡Usuario Administrador creado con éxito!");
    console.log(`Email: ${emailAdmin}`);
    console.log(`Password: ${passwordPlano}`);
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error(
      "Error crítico durante la ejecución del seeder:",
      error.message,
    );
    process.exit(1);
  }
};

seedAdministrator();
