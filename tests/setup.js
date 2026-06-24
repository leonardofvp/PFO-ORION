import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getUri, conectarDB, cerrarDB } from "../config/db";

let mongoServer;

beforeAll(async () => {

})