import dotenv from "dotenv"

dotenv.config();

const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '';
const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const authSecret = process.env.AUTH_SECRET || '';

// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


if (!port) {
  throw new Error('PORT environmental variable is not defined');
}

if (!allowedOrigin) {
  throw new Error('ALLOWED_ORIGIN environmental variable is not defined');
}

if (!dbHost) {
  throw new Error('DB_HOST environmental variable is not defined');
}

if (!dbName) {
  throw new Error('DB_NAME environmental variable is not defined');
}

if (!dbUser) {
  throw new Error('DB_USER environmental variable is not defined');
}

if (!dbPassword) {
  throw new Error('DB_PASSWORD environmental variable is not defined');
}

if (!authSecret) {
  throw new Error('AUTH_SECRET environmental variable is not defined');
}

const expiresIn = process.env.EXPIRES_IN;
if (!expiresIn) {
  throw new Error("expiresIn is not defined")
}

const authKey = process.env.AUTH_KEY;
if (!authKey) {
  throw new Error("authKey is not defined")
}

const audioServerHost = process.env.AUDIO_SERVER_HOST;
if (!audioServerHost) {
  throw new Error("audioServerHost is not defined")
}

const courierImagesFolderPath = path.join(__dirname, 'images/couriersImages');
const customerImagesFolderPath = path.join(__dirname, 'images/customersImages');



export {
  port,
  allowedOrigin,
  dbName,
  dbHost,
  dbUser,
  dbPassword,
  authSecret,
  expiresIn,
  authKey,
  audioServerHost,
  courierImagesFolderPath,
};