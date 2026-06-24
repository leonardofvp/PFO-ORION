import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

const getUri = async () => {
  if (process.env.NODE_ENV === "test") {
    await mongoServer.start();
    return mongoServer.getUri();
  }
  return process.env.MONGO_URI;
};

const conectarDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { getUri, conectarDB };
