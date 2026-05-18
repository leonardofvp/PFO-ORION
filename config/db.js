import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        await mongoose.conectarDB(process.env.MONGO_URI)
        console.log("Base de datos conectada");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}