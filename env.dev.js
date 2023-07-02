import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const getEnvVariable = name => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environmental variable is not defined`);
  }
  return value;
};

const port = getEnvVariable('PORT');
const allowedOrigin = getEnvVariable('ALLOWED_ORIGIN');
const dbHost = getEnvVariable('DB_HOST');
const dbName = getEnvVariable('DB_NAME');
const dbUser = getEnvVariable('DB_USER');
const dbPassword = getEnvVariable('DB_PASSWORD');
const jwtExpiration = getEnvVariable('JWT_EXPIRATION');
const jwtSecret = getEnvVariable('JWT_SECRET');
const refreshTokenSecretKey = getEnvVariable('REFRESH_TOKEN_SECRET');
const refreshTokenExpiration = getEnvVariable('REFRESH_TOKEN_EXPIRATION');

const filesPath = path.join(__dirname);

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
};
