import { dbHost, dbName, dbUser, dbPassword } from "../env.dev.js";

export default {
  HOST: dbHost,
  USER: dbUser,
  PASSWORD: dbPassword,
  DB: dbName,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};