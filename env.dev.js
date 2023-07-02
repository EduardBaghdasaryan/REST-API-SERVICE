import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '';
const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const jwtExpiration = process.env.JWT_EXPIRATION || '';
const jwtSecret = process.env.JWT_SECRET || ''
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT


const filesPath = path.join(__dirname);


if (!port) {
  throw new Error('PORT environmental variable is not defined');
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

export {
  port,
  allowedOrigin,
  dbName,
  dbHost,
  dbUser,
  dbPassword,
  jwtExpiration,
  jwtSecret,
  filesPath,
  refreshTokenSecretKey,
  refreshTokenExpiration,
  redisHost,
  redisPort
};